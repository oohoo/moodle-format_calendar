<?php

/**
 * *************************************************************************
 * *                  OOHOO Calendar Course format                        **
 * *************************************************************************
 * @package     format                                                    **
 * @subpackage  calendar                                                  **
 * @name        calendar                                                  **
 * @copyright   oohoo.biz                                                 **
 * @link        http://oohoo.biz                                          **
 * @author      Nicolas Bretin                                            **
 * @license     http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later  **
 * *************************************************************************
 * ************************************************************************ */

/**
 * Indicates this format uses sections.
 *
 * @return bool Returns true
 */
function callback_calendar_uses_sections()
{
    return true;
}

/**
 * Used to display the course structure for a course where format=calendar
 *
 * This is called automatically by {@link load_course()} if the current course
 * format = calendar.
 *
 * @param navigation_node $navigation The course node
 * @param array $path An array of keys to the course node
 * @param stdClass $course The course we are loading the section for
 */
function callback_calendar_load_content(&$navigation, $course, $coursenode)
{
    return $navigation->load_generic_course_sections($course, $coursenode, 'calendar');
}

/**
 * The string that is used to describe a section of the course
 * e.g. Topic, day...
 *
 * @return string
 */
function callback_calendar_definition()
{
    return get_string('day', 'format_calendar');
}

/**
 * The GET argument variable that is used to identify the section being
 * viewed by the user (if there is one)
 *
 * @return string
 */
function callback_calendar_request_key()
{
    return 'day';
}

/**
 * Gets the name for the provided section.
 *
 * @param stdClass $course
 * @param stdClass $section
 * @return string
 */
function callback_calendar_get_section_name($course, $section)
{
    // We can't add a node without text
    if (!empty($section->name))
    {
        // Return the name the user set
        return format_string($section->name, true, array('context' => get_context_instance(CONTEXT_COURSE, $course->id)));
    }
    else if ($section->section == 0)
    {
        // Return the section0name
        return get_string('section0name', 'format_calendar');
    }
    else
    {
        // Got to work out the date of the day so that we can show it
        $sections = get_all_sections($course->id);
        $daydate = $course->startdate + 7200;
        foreach ($sections as $sec)
        {
            if ($sec->id == $section->id)
            {
                break;
            }
            else if ($sec->section != 0)
            {
                $daydate += 86400;
            }
        }

        $strftimedateshort = ' ' . get_string('strftimedateshort');
        $dayday = userdate($daydate, $strftimedateshort);
        return $dayday;
    }
}

/**
 * Declares support for course AJAX features
 *
 * @see course_format_ajax_support()
 * @return stdClass
 */
function callback_calendar_ajax_support()
{
    $ajaxsupport = new stdClass();
    $ajaxsupport->capable = true;
    $ajaxsupport->testedbrowsers = array('MSIE' => 6.0, 'Gecko' => 20061111, 'Safari' => 531, 'Chrome' => 6.0);
    return $ajaxsupport;
}

/**
 * Returns a URL to arrive directly at a section
 *
 * @param int $courseid The id of the course to get the link for
 * @param int $sectionnum The section number to jump to
 * @return moodle_url
 */
function callback_calendar_get_section_url($courseid, $sectionnum)
{
    return new moodle_url('/course/view.php', array('id' => $courseid, 'day' => $sectionnum));
}

/**
 * Return the start and end date of the passed section
 *
 * @param stdClass $section The course_section entry from the DB
 * @param stdClass $course The course entry from DB
 * @return stdClass property start for startdate, property end for enddate
 */
function format_calendar_get_section_dates($section, $course)
{
    $onedayseconds = 86400;

    $startdate = $course->startdate;

    $dates = new stdClass();
    $dates->start = $startdate + ($onedayseconds * ($section->section - 1));
    $dates->end = $dates->start + $onedayseconds;

    return $dates;
}
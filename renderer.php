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
defined('MOODLE_INTERNAL') || die();
require_once($CFG->dirroot . '/course/format/renderer.php');
require_once($CFG->dirroot . '/course/format/calendar/lib.php');

/**
 * Basic renderer for calendar format.
 *
 * @copyright 2012 Nicolas Bretin
 * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class format_calendar_renderer extends format_section_renderer_base
{

    /**
     * Generate the starting container html for a list of sections
     * @return string HTML to output.
     */
    protected function start_section_list()
    {
        return html_writer::start_tag('ul', array('class' => 'days'));
    }

    /**
     * Generate the closing container html for a list of sections
     * @return string HTML to output.
     */
    protected function end_section_list()
    {
        return html_writer::end_tag('ul');
    }

    /**
     * Generate the title for this section page
     * @return string the page title
     */
    protected function page_title()
    {
        return get_string('dailyoutline');
    }

    /**
     * Is the section passed in the current section?
     *
     * @param stdClass $section The course_section entry from the DB
     * @param stdClass $course The course entry from DB
     * @return bool true if the section is current
     */
    protected function is_section_current($section, $course)
    {
        if ($section->section < 1)
        {
            return false;
        }

        $timenow = time();
        $dates = format_calendar_get_section_dates($section, $course);

        return (($timenow >= $dates->start) && ($timenow < $dates->end));
    }

}

?>
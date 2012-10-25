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

//Date extention to get the week of the year
Date.prototype.getWeek = function()
{
    var onejan = new Date(this.getFullYear(),0,1);
    return Math.ceil((((this - onejan) / 86400000) + onejan.getDay()+1)/7);
} 


//Hide or show the weekends
function toggleWeekends()
{
    var displayed = 'none';
    if (YAHOO.util.Dom.getElementsByClassName('weekday-0')[0].style['display'] == 'none')
    {
        displayed = 'table-cell';
    }
    
    var elems = YAHOO.util.Dom.getElementsByClassName('weekday-0');
    for(var i=0;i< elems.length;i++)
    {
        YAHOO.util.Dom.setStyle([elems[i]], 'display', displayed);
    }
    
    var elems = YAHOO.util.Dom.getElementsByClassName('weekday-6');
    for(var i=0;i< elems.length;i++)
    {
        YAHOO.util.Dom.setStyle([elems[i]], 'display', displayed);
    }
}


var activeMonth;
//Display all data of the course
function displayAllMonths()
{
    var elems = YAHOO.util.Dom.getElementsByClassName('week');
    activeMonth = '';
    for(var i=0;i< elems.length;i++)
    {
        YAHOO.util.Dom.setStyle([elems[i]], 'display', 'table-row');
    }
    displayPreviousNextMonthButton(false);
    displayPreviousNextWeekButton(false);
}

//Display the selected month
function displayMonth(month)
{
    var elems = YAHOO.util.Dom.getElementsByClassName('week');
    var elemsDisplay = YAHOO.util.Dom.getElementsByClassName('month-'+month);
    //If there is no elements in this month, do nothing
    if (elemsDisplay.length>0)
    {
        activeMonth = month;
        for(var i=0;i< elems.length;i++)
        {
            YAHOO.util.Dom.setStyle([elems[i]], 'display', 'none');
        }

        for(i=0;i< elemsDisplay.length;i++)
        {
            YAHOO.util.Dom.setStyle([elemsDisplay[i]], 'display', 'table-row');
        }
        displayPreviousNextMonthButton(true);
        displayPreviousNextWeekButton(false);
    
        return true;
    }
    else
    {
        return false;
    }
}

//Display the month of today
function displayCurrentMonth()
{
    var month = new Date();
    var count = 0;
    month = month.getMonth()+1;
    
    while(!displayMonth(month) && count <= 13)
    {
        month++;
        if (month >= 12)
        {
            month = 1;
        }
        count++;
    }
}

//Display the previous month  function of the activeMonth set
function displayPreviousMonth()
{
    if (activeMonth <= 1)
    {
        displayMonth(12);
    }
    else
    {
        displayMonth(activeMonth-1);
    }
}

//Display the next month  function of the activeMonth set
function displayNextMonth()
{
    if (activeMonth >= 12)
    {
        displayMonth(1);
    }
    else
    {
        displayMonth(activeMonth+1);
    }
}

//Display the action buttons for the next previous month
function displayPreviousNextMonthButton(display)
{
    var previous = YAHOO.util.Dom.get('displayPreviousMonth');
    var next = YAHOO.util.Dom.get('displayNextMonth');
    if(display)
    {
        YAHOO.util.Dom.setStyle([previous], 'display', 'inline');
        YAHOO.util.Dom.setStyle([next], 'display', 'inline');
    }
    else
    {
        YAHOO.util.Dom.setStyle([previous], 'display', 'none');
        YAHOO.util.Dom.setStyle([next], 'display', 'none');
    }
}


var activeWeek;
//Display the selected week
function displayWeek(week)
{
    var elems = YAHOO.util.Dom.getElementsByClassName('week');
    var elemsDisplay = YAHOO.util.Dom.getElementsByClassName('week-'+week);
    //If there is no elements in this month, do nothing
    if (elemsDisplay.length>0)
    {
        activeWeek = week;
        for(var i=0;i< elems.length;i++)
        {
            YAHOO.util.Dom.setStyle([elems[i]], 'display', 'none');
        }

        for(i=0;i< elemsDisplay.length;i++)
        {
            YAHOO.util.Dom.setStyle([elemsDisplay[i]], 'display', 'table-row');
        }
        
        displayPreviousNextWeekButton(true);
        displayPreviousNextMonthButton(false);
        return true;
    }
    else
    {
        return false;
    }
}

//Display the week of today
function displayCurrentWeek()
{
    var week = new Date();
    var count = 0;
    week = week.getWeek();
    
    while(!displayWeek(week) && count <= 53)
    {
        week++;
        if (week >= 52)
        {
            week = 1;
        }
        count++;
    }
}

//Display the previous week function of the activeWeek set
function displayPreviousWeek()
{
    if (activeWeek <= 1)
    {
        displayWeek(52);
    }
    else
    {
        displayWeek(activeWeek-1);
    }
}

//Display the next Week  function of the activeWeek set
function displayNextWeek()
{
    if (activeWeek >= 52)
    {
        displayWeek(1);
    }
    else
    {
        displayWeek(activeWeek+1);
    }
}

//Display the action buttons for the next previous week
function displayPreviousNextWeekButton(display)
{
    var previous = YAHOO.util.Dom.get('displayPreviousWeek');
    var next = YAHOO.util.Dom.get('displayNextWeek');
    if(display)
    {
        YAHOO.util.Dom.setStyle([previous], 'display', 'inline');
        YAHOO.util.Dom.setStyle([next], 'display', 'inline');
    }
    else
    {
        YAHOO.util.Dom.setStyle([previous], 'display', 'none');
        YAHOO.util.Dom.setStyle([next], 'display', 'none');
    }
}


// Javascript functions for Days course format

M.course = M.course || {};

M.course.format = M.course.format || {};

/**
 * Get sections config for this format
 *
 * The section structure is:
 * <table class="days">
 *  <td class="section">...</td>
 *  <td class="section">...</td>
 *   ...
 * </table>
 *
 * @return {object} section list configuration
 */
M.course.format.get_config = function() {
    return {
        container_node : 'table',
        container_class : 'days',
        section_node : 'li',
        section_class : 'section'
    };
}

/**
 * Swap section
 *
 * @param {YUI} Y YUI3 instance
 * @param {string} node1 node to swap to
 * @param {string} node2 node to swap with
 * @return {NodeList} section list
 */
M.course.format.swap_sections = function(Y, node1, node2) {
    var CSS = {
        COURSECONTENT : 'course-content',
        SECTIONADDMENUS : 'section_add_menus'
    };

    var sectionlist = Y.Node.all('.'+CSS.COURSECONTENT+' '+M.course.format.get_section_selector(Y));
    // Swap menus
    sectionlist.item(node1).one('.'+CSS.SECTIONADDMENUS).swap(sectionlist.item(node2).one('.'+CSS.SECTIONADDMENUS));
}

/**
 * Process sections after ajax response
 *
 * @param {YUI} Y YUI3 instance
 * @param {array} response ajax response
 * @param {string} sectionfrom first affected section
 * @param {string} sectionto last affected section
 * @return void
 */
M.course.format.process_sections = function(Y, sectionlist, response, sectionfrom, sectionto) {
    var CSS = {
        SECTIONNAME : 'sectionname'
    };

    if (response.action == 'move') {
        // update titles in all affected sections
        for (var i = sectionfrom; i <= sectionto; i++) {
            sectionlist.item(i).one('.'+CSS.SECTIONNAME).setContent(response.sectiontitles[i]);
        }
    }
}
$(document).ready(function(){
    
    // Collapse/Expand icon
    $('#collapse-icon').addClass('fa-angle-double-left')
    // Collapse click
    $('[data-toggle=sidebar-colapse]').click(function() {
        SidebarCollapse();
    });
    function SidebarCollapse () {
        $('.menu-collapsed').toggleClass('d-none');
        $('.sidebar-submenu').toggleClass('d-none');
        $('.submenu-icon').toggleClass('d-none');
        $('#sidebar-container').toggleClass('sidebar-collapsed');
        
        // Collapse/Expand icon
        $('#collapse-icon').toggleClass('fa-angle-double-right fa-angle-double-left');
    }
    });
    // Collapse click
    $('[data-toggle=sidebar-container]').click(function() {
        SidemenuCollapse();
    });
    //Collapse Side Menu
    function SidemenuCollapse () {
        $('#sidebar-container').toggleClass('d-none');
        // Collapse/Expand icon
        $('#collapse-menu').toggleClass('fa-angle-double-right fa-angle-double-left');
    }
    
    
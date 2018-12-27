interface MenuItem {
    name: string;
    icon: string;
    link: string;
    component:string;
}

export const MENU_ITEMS:MenuItem[] = [
        {
        name:"Inicio",
        icon: "home",
        link:"dashboard",
        component:"DashboardComponent"
        },
        {
        name:"Asistencias",
        icon: "assignment_ind",
        link:"attendance",
        component:"AttendanceComponent"
        },
        {
        name:"Soporte",
        icon: "playlist_add_check",
        link:"support",
        component:"SupportComponent"
        },
        {
        name:"Reportes",
        icon: "bar_chart",
        link:"report",
        component:"ReportComponent"
        }
    ];
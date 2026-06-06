import { LayoutSideContent, Bell, Envelope, Gear, House, Plus, Person, Briefcase } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";
import Link from "next/link";

export default function DashboardSidebar() {
    const navItems = [
        { icon: House, href: '/dashboard/recruiter', label: "Home" },
        { icon: Bell, href: '/dashboard/recruiter/jobs', label: "Jobs" },
        { icon: Plus, href: '/dashboard/recruiter/jobs/new', label: "Add A New Job" },
        { icon: Briefcase, href: '/dashboard/recruiter/company', label: "Company Profile" },
        { icon: Envelope,href:'/dashboard/recruiter', label: "Messages" },
        { icon: Person, href: '/dashboard/recruiter', label: "Profile" },
        { icon: Gear,href:'/dashboard/recruiter', label: "Settings" },
    ];

    const navLinks = <nav className="flex flex-col gap-1">
        {navItems.map((item) => (
            <Link
                key={item.label}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                href={item.href}
            >
                <item.icon className="size-5 text-muted" />
                {item.label}
            </Link>
        ))}
    </nav>

    return (
        <>
        <aside className="hidden lg:block w-64 p-4">
            {navLinks}
        </aside>

            <Drawer>
                <Button className="lg:hidden" variant="secondary">
                    <LayoutSideContent />
                    Sidebar
                </Button>
                <Drawer.Backdrop>
                    <Drawer.Content placement="left">
                        <Drawer.Dialog>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Heading>Navigation</Drawer.Heading>
                            </Drawer.Header>
                            <Drawer.Body>
                                {navLinks}
                            </Drawer.Body>
                        </Drawer.Dialog>
                    </Drawer.Content>
                </Drawer.Backdrop>
            </Drawer>
        </>
    );
}
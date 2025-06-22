import React, { useState } from "react";
import { Search, Filter, PlusCircle, User, Mail, Phone, Shield, Edit, Trash2, MoreHorizontal } from "lucide-react";
import AddStaff from "./AddStaff";

export interface StaffMember {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: "manager" | "cashier" | "usher" | "cleaner" | "technician";
    department: string;
    hireDate: string;
    status: "active" | "inactive" | "on-leave";
    avatar?: string;
}

const dummyStaff: StaffMember[] = [
    {
        id: "ST001",
        name: "Sarah Johnson",
        email: "sarah.johnson@cinema.com",
        phone: "+1 (555) 123-4567",
        role: "manager",
        department: "Management",
        hireDate: "2023-01-15",
        status: "active"
    },
    {
        id: "ST002",
        name: "Mike Chen",
        email: "mike.chen@cinema.com",
        phone: "+1 (555) 234-5678",
        role: "cashier",
        department: "Customer Service",
        hireDate: "2023-03-20",
        status: "active"
    },
    {
        id: "ST003",
        name: "Lisa Wang",
        email: "lisa.wang@cinema.com",
        phone: "+1 (555) 345-6789",
        role: "cashier",
        department: "Customer Service",
        hireDate: "2023-02-10",
        status: "active"
    },
    {
        id: "ST004",
        name: "David Rodriguez",
        email: "david.rodriguez@cinema.com",
        phone: "+1 (555) 456-7890",
        role: "usher",
        department: "Operations",
        hireDate: "2023-04-05",
        status: "active"
    },
    {
        id: "ST005",
        name: "Emma Davis",
        email: "emma.davis@cinema.com",
        phone: "+1 (555) 567-8901",
        role: "cleaner",
        department: "Maintenance",
        hireDate: "2023-01-30",
        status: "active"
    },
    {
        id: "ST006",
        name: "James Wilson",
        email: "james.wilson@cinema.com",
        phone: "+1 (555) 678-9012",
        role: "technician",
        department: "Technical",
        hireDate: "2022-11-15",
        status: "on-leave"
    },
    {
        id: "ST007",
        name: "Maria Garcia",
        email: "maria.garcia@cinema.com",
        phone: "+1 (555) 789-0123",
        role: "cashier",
        department: "Customer Service",
        hireDate: "2023-05-12",
        status: "inactive"
    },
    {
        id: "ST008",
        name: "Alex Thompson",
        email: "alex.thompson@cinema.com",
        phone: "+1 (555) 890-1234",
        role: "usher",
        department: "Operations",
        hireDate: "2023-06-01",
        status: "active"
    }
];

function StaffCard({ member }: { member: StaffMember }) {
    const getRoleColor = (role: string) => {
        switch (role) {
            case "manager": return "bg-purple-600/20 text-purple-400";
            case "cashier": return "bg-blue-600/20 text-blue-400";
            case "usher": return "bg-green-600/20 text-green-400";
            case "cleaner": return "bg-orange-600/20 text-orange-400";
            case "technician": return "bg-red-600/20 text-red-400";
            default: return "bg-gray-600/20 text-gray-400";
        }
    };

    const getRoleIcon = (role: string) => {
        switch (role) {
            case "manager": return <Shield className="w-4 h-4" />;
            case "cashier": return <User className="w-4 h-4" />;
            case "usher": return <User className="w-4 h-4" />;
            case "cleaner": return <User className="w-4 h-4" />;
            case "technician": return <User className="w-4 h-4" />;
            default: return <User className="w-4 h-4" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "active": return "bg-green-600/20 text-green-400";
            case "inactive": return "bg-red-600/20 text-red-400";
            case "on-leave": return "bg-yellow-600/20 text-yellow-400";
            default: return "bg-gray-600/20 text-gray-400";
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "active": return "Active";
            case "inactive": return "Inactive";
            case "on-leave": return "On Leave";
            default: return "Unknown";
        }
    };

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 hover:border-blue-500/50 transition-colors duration-300">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-slate-400" />
                    </div>
                    <div>
                        <h3 className="text-white font-semibold">{member.name}</h3>
                        <p className="text-slate-400 text-xs">ID: {member.id}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(member.status)}`}>
                        {getStatusText(member.status)}
                    </span>
                </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300">{member.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300">{member.phone}</span>
                </div>
            </div>

            {/* Role and Department */}
            <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getRoleColor(member.role)}`}>
                    {getRoleIcon(member.role)}
                    {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                </span>
                <span className="text-sm text-slate-400">{member.department}</span>
            </div>

            {/* Hire Date */}
            <div className="text-sm text-slate-400 mb-4">
                Hired: {new Date(member.hireDate).toLocaleDateString()}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button className="p-2 rounded hover:bg-slate-800 transition-colors">
                    <Edit className="w-4 h-4 text-blue-400" />
                </button>
                <button className="p-2 rounded hover:bg-slate-800 transition-colors">
                    <Trash2 className="w-4 h-4 text-red-400" />
                </button>
                <button className="p-2 rounded hover:bg-slate-800 transition-colors">
                    <MoreHorizontal className="w-4 h-4 text-slate-400" />
                </button>
            </div>
        </div>
    );
}

export default function Staff() {
    const [staff, setStaff] = useState<StaffMember[]>(dummyStaff);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRole, setSelectedRole] = useState<string>("all");
    const [selectedStatus, setSelectedStatus] = useState<string>("all");
    const [selectedDepartment, setSelectedDepartment] = useState<string>("all");
    const [addingStaff, setAddingStaff] = useState(false);

    const filteredStaff = staff.filter(member => {
        const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.phone.includes(searchTerm);
        const matchesRole = selectedRole === "all" || member.role === selectedRole;
        const matchesStatus = selectedStatus === "all" || member.status === selectedStatus;
        const matchesDepartment = selectedDepartment === "all" || member.department === selectedDepartment;

        return matchesSearch && matchesRole && matchesStatus && matchesDepartment;
    });

    const getRoleColor = (role: string) => {
        switch (role) {
            case "manager": return "bg-purple-600/20 text-purple-400";
            case "cashier": return "bg-blue-600/20 text-blue-400";
            case "usher": return "bg-green-600/20 text-green-400";
            case "cleaner": return "bg-orange-600/20 text-orange-400";
            case "technician": return "bg-red-600/20 text-red-400";
            default: return "bg-gray-600/20 text-gray-400";
        }
    };

    const getRoleIcon = (role: string) => {
        switch (role) {
            case "manager": return <Shield className="w-4 h-4" />;
            case "cashier": return <User className="w-4 h-4" />;
            case "usher": return <User className="w-4 h-4" />;
            case "cleaner": return <User className="w-4 h-4" />;
            case "technician": return <User className="w-4 h-4" />;
            default: return <User className="w-4 h-4" />;
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "active": return "bg-green-600/20 text-green-400";
            case "inactive": return "bg-red-600/20 text-red-400";
            case "on-leave": return "bg-yellow-600/20 text-yellow-400";
            default: return "bg-gray-600/20 text-gray-400";
        }
    };

    const getStatusText = (status: string) => {
        switch (status) {
            case "active": return "Active";
            case "inactive": return "Inactive";
            case "on-leave": return "On Leave";
            default: return "Unknown";
        }
    };

    const departments = Array.from(new Set(staff.map(s => s.department)));

    const handleBackToStaff = () => {
        setAddingStaff(false);
    };

    const handleAddStaff = () => {
        setAddingStaff(true);
    };

    // If adding staff, show the AddStaff component
    if (addingStaff) {
        return (
            <AddStaff onBack={handleBackToStaff} />
        );
    }

    return (
        <div className="flex flex-col gap-6 p-4 w-full">
            {/* Header */}
            <div className="flex flex-row items-center justify-between">
                <div className="flex flex-col">
                    <h2 className="text-2xl font-bold tracking-tight text-white">Staff Management</h2>
                    <p className="text-slate-400">Manage your cinema staff members and roles.</p>
                </div>
                <button
                    onClick={handleAddStaff}
                    className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center gap-2 transition-transform hover:scale-105"
                >
                    <PlusCircle className="w-4 h-4" />
                    Add Staff Member
                </button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="relative flex-1 sm:flex-none sm:w-80">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search staff by name, email, or phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-full border border-slate-700 bg-slate-800 px-10 py-2 text-white"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-slate-400" />
                    <select
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white text-sm"
                    >
                        <option value="all">All Roles</option>
                        <option value="manager">Manager</option>
                        <option value="cashier">Cashier</option>
                        <option value="usher">Usher</option>
                        <option value="cleaner">Cleaner</option>
                        <option value="technician">Technician</option>
                    </select>

                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white text-sm"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="on-leave">On Leave</option>
                    </select>

                    <select
                        value={selectedDepartment}
                        onChange={(e) => setSelectedDepartment(e.target.value)}
                        className="rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white text-sm"
                    >
                        <option value="all">All Departments</option>
                        {departments.map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Results count */}
            <div className="text-sm text-slate-400">
                {filteredStaff.length} staff member{filteredStaff.length !== 1 ? 's' : ''} found
            </div>

            {/* Mobile Cards View (sm and below) */}
            <div className="grid gap-4 sm:hidden">
                {filteredStaff.length > 0 ? (
                    filteredStaff.map((member) => (
                        <StaffCard key={member.id} member={member} />
                    ))
                ) : (
                    <div className="text-center py-8">
                        <User className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                        <p className="text-slate-400 text-lg mb-2">No staff members found</p>
                        <p className="text-slate-500">Try adjusting your search or filters</p>
                    </div>
                )}
            </div>

            {/* Desktop Table View (lg and above) */}
            <div className="hidden lg:block rounded-xl border bg-slate-900/50 border-slate-800 shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-slate-300">
                        <thead className="text-xs text-slate-400 uppercase bg-slate-800/50">
                            <tr>
                                <th scope="col" className="px-6 py-4">Staff Member</th>
                                <th scope="col" className="px-6 py-4">Contact</th>
                                <th scope="col" className="px-6 py-4">Role</th>
                                <th scope="col" className="px-6 py-4">Department</th>
                                <th scope="col" className="px-6 py-4">Hire Date</th>
                                <th scope="col" className="px-6 py-4">Status</th>
                                <th scope="col" className="px-6 py-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredStaff.map((member) => (
                                <tr key={member.id} className="border-b border-slate-800 hover:bg-slate-800/40">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center">
                                                <User className="w-5 h-5 text-slate-400" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-white">{member.name}</div>
                                                <div className="text-slate-400 text-xs">ID: {member.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-xs">
                                                <Mail className="w-3 h-3" />
                                                {member.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-xs">
                                                <Phone className="w-3 h-3" />
                                                {member.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 w-fit ${getRoleColor(member.role)}`}>
                                            {getRoleIcon(member.role)}
                                            {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-300">
                                        {member.department}
                                    </td>
                                    <td className="px-6 py-4 text-slate-300">
                                        {new Date(member.hireDate).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(member.status)}`}>
                                            {getStatusText(member.status)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button className="p-1 rounded hover:bg-slate-700 transition-colors">
                                                <Edit className="w-4 h-4 text-blue-400" />
                                            </button>
                                            <button className="p-1 rounded hover:bg-slate-700 transition-colors">
                                                <Trash2 className="w-4 h-4 text-red-400" />
                                            </button>
                                            <button className="p-1 rounded hover:bg-slate-700 transition-colors">
                                                <MoreHorizontal className="w-4 h-4 text-slate-400" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Empty State for Desktop */}
            {filteredStaff.length === 0 && (
                <div className="hidden lg:block text-center py-12">
                    <User className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <p className="text-slate-400 text-lg mb-2">No staff members found</p>
                    <p className="text-slate-500">Try adjusting your search or filters</p>
                </div>
            )}
        </div>
    );
}
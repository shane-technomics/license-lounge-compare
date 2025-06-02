
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { BarChart3, DollarSign, TrendingUp, Users, Edit3, Save, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Program {
  id: number;
  name: string;
  description: string;
  users: number;
  monthlyCost: number;
  category: string;
  color: string;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [editingProgram, setEditingProgram] = useState<number | null>(null);

  const [programs, setPrograms] = useState<Program[]>([
    {
      id: 1,
      name: "Adobe Creative Suite",
      description: "Design and creative tools",
      users: 150,
      monthlyCost: 52.99,
      category: "Design",
      color: "bg-gradient-to-br from-red-500 to-pink-600"
    },
    {
      id: 2,
      name: "Microsoft 365",
      description: "Productivity and collaboration",
      users: 320,
      monthlyCost: 22.00,
      category: "Productivity",
      color: "bg-gradient-to-br from-blue-500 to-blue-700"
    },
    {
      id: 3,
      name: "Salesforce CRM",
      description: "Customer relationship management",
      users: 85,
      monthlyCost: 165.00,
      category: "CRM",
      color: "bg-gradient-to-br from-cyan-500 to-blue-600"
    },
    {
      id: 4,
      name: "Slack Enterprise",
      description: "Team communication platform",
      users: 280,
      monthlyCost: 15.00,
      category: "Communication",
      color: "bg-gradient-to-br from-purple-500 to-indigo-600"
    },
    {
      id: 5,
      name: "Zoom Pro",
      description: "Video conferencing solution",
      users: 200,
      monthlyCost: 19.99,
      category: "Communication",
      color: "bg-gradient-to-br from-green-500 to-emerald-600"
    },
    {
      id: 6,
      name: "Figma Organization",
      description: "Collaborative design platform",
      users: 45,
      monthlyCost: 45.00,
      category: "Design",
      color: "bg-gradient-to-br from-orange-500 to-red-600"
    }
  ]);

  const totalMonthlyCost = programs.reduce((sum, program) => sum + (program.monthlyCost * program.users), 0);
  const totalUsers = programs.reduce((sum, program) => sum + program.users, 0);

  const chartData = programs.map(program => ({
    name: program.name,
    cost: program.monthlyCost * program.users,
    users: program.users,
    costPerUser: program.monthlyCost
  }));

  const handleEdit = (programId: number) => {
    setEditingProgram(programId);
  };

  const handleSave = (programId: number) => {
    setEditingProgram(null);
  };

  const handleCancel = () => {
    setEditingProgram(null);
  };

  const updateProgram = (id: number, field: keyof Program, value: string | number) => {
    setPrograms(programs.map(program => 
      program.id === id ? { ...program, [field]: value } : program
    ));
  };

  const addNewProgram = () => {
    const newProgram: Program = {
      id: Date.now(),
      name: "New Program",
      description: "Enter description",
      users: 0,
      monthlyCost: 0,
      category: "Other",
      color: "bg-gradient-to-br from-gray-500 to-gray-600"
    };
    setPrograms([...programs, newProgram]);
    setEditingProgram(newProgram.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">LicenseCost Dashboard</h1>
                <p className="text-sm text-gray-500">Manage and compare license costs</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button 
                onClick={addNewProgram}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white"
              >
                Add Program
              </Button>
              <Button 
                onClick={() => navigate('/')}
                variant="outline"
                className="hover:bg-blue-50"
              >
                Back to Home
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Monthly Cost</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalMonthlyCost.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                ${(totalMonthlyCost * 12).toLocaleString()} annually
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Across {programs.length} programs
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Cost per User</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(totalMonthlyCost / totalUsers).toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Per user per month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Cost Comparison</CardTitle>
            <CardDescription>Monthly costs by program</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="cost" fill="#3B82F6" name="Total Monthly Cost" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Programs Grid */}
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">License Programs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => (
              <Card key={program.id} className="hover:shadow-xl transition-all duration-300">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-lg ${program.color} mb-3`}>
                      <BarChart3 className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex space-x-2">
                      {editingProgram === program.id ? (
                        <>
                          <Button size="sm" variant="outline" onClick={() => handleSave(program.id)}>
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={handleCancel}>
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => handleEdit(program.id)}>
                          <Edit3 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  {editingProgram === program.id ? (
                    <div className="space-y-2">
                      <Input
                        value={program.name}
                        onChange={(e) => updateProgram(program.id, 'name', e.target.value)}
                        className="font-semibold"
                      />
                      <Input
                        value={program.description}
                        onChange={(e) => updateProgram(program.id, 'description', e.target.value)}
                        className="text-sm"
                      />
                      <Input
                        value={program.category}
                        onChange={(e) => updateProgram(program.id, 'category', e.target.value)}
                        className="text-sm"
                      />
                    </div>
                  ) : (
                    <>
                      <CardTitle className="text-xl">{program.name}</CardTitle>
                      <CardDescription className="text-sm">{program.description}</CardDescription>
                      <Badge variant="secondary">{program.category}</Badge>
                    </>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Active users</span>
                      {editingProgram === program.id ? (
                        <Input
                          type="number"
                          value={program.users}
                          onChange={(e) => updateProgram(program.id, 'users', parseInt(e.target.value) || 0)}
                          className="w-20 h-8 text-right"
                        />
                      ) : (
                        <span className="font-semibold">{program.users}</span>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Monthly per user</span>
                      {editingProgram === program.id ? (
                        <Input
                          type="number"
                          step="0.01"
                          value={program.monthlyCost}
                          onChange={(e) => updateProgram(program.id, 'monthlyCost', parseFloat(e.target.value) || 0)}
                          className="w-24 h-8 text-right"
                        />
                      ) : (
                        <span className="font-semibold">${program.monthlyCost}</span>
                      )}
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Total monthly cost</span>
                        <span className="text-lg font-bold text-blue-600">
                          ${(program.monthlyCost * program.users).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { ArrowLeft, Edit3, Save, X, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  
  const [programs, setPrograms] = useState([
    {
      id: 1,
      name: "Adobe Creative Suite",
      description: "Design and creative tools",
      users: 150,
      monthlyCost: 52.99,
      category: "Design"
    },
    {
      id: 2,
      name: "Microsoft 365",
      description: "Productivity and collaboration",
      users: 320,
      monthlyCost: 22.00,
      category: "Productivity"
    },
    {
      id: 3,
      name: "Salesforce CRM",
      description: "Customer relationship management",
      users: 85,
      monthlyCost: 165.00,
      category: "CRM"
    },
    {
      id: 4,
      name: "Slack Enterprise",
      description: "Team communication platform",
      users: 280,
      monthlyCost: 15.00,
      category: "Communication"
    },
    {
      id: 5,
      name: "Zoom Pro",
      description: "Video conferencing solution",
      users: 200,
      monthlyCost: 19.99,
      category: "Communication"
    },
    {
      id: 6,
      name: "Figma Organization",
      description: "Collaborative design platform",
      users: 45,
      monthlyCost: 45.00,
      category: "Design"
    }
  ]);

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newProgram, setNewProgram] = useState({
    name: "",
    description: "",
    users: 0,
    monthlyCost: 0,
    category: ""
  });

  const chartData = programs.map(program => ({
    name: program.name.split(' ')[0], // Shortened names for chart
    totalCost: program.monthlyCost * program.users,
    perUser: program.monthlyCost,
    users: program.users
  }));

  const categoryData = programs.reduce((acc, program) => {
    const existing = acc.find(item => item.name === program.category);
    if (existing) {
      existing.value += program.monthlyCost * program.users;
    } else {
      acc.push({
        name: program.category,
        value: program.monthlyCost * program.users
      });
    }
    return acc;
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

  const startEdit = (program) => {
    setEditingId(program.id);
    setEditForm({ ...program });
  };

  const saveEdit = () => {
    setPrograms(programs.map(p => p.id === editingId ? editForm : p));
    setEditingId(null);
    setEditForm({});
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const addNewProgram = () => {
    const id = Math.max(...programs.map(p => p.id)) + 1;
    setPrograms([...programs, { ...newProgram, id }]);
    setNewProgram({ name: "", description: "", users: 0, monthlyCost: 0, category: "" });
    setIsAddingNew(false);
  };

  const deleteProgram = (id) => {
    setPrograms(programs.filter(p => p.id !== id));
  };

  const totalMonthlyCost = programs.reduce((sum, program) => sum + (program.monthlyCost * program.users), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="hover:bg-gray-100"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Overview
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">License Cost Dashboard</h1>
                <p className="text-sm text-gray-500">Compare and manage program costs</p>
              </div>
            </div>
            <Button 
              onClick={() => setIsAddingNew(true)}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Program
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Total Monthly Costs by Program</CardTitle>
              <CardDescription>Compare total spending across all programs</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Total Cost']} />
                  <Bar dataKey="totalCost" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>Cost Distribution by Category</CardTitle>
              <CardDescription>Breakdown of costs by program category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Total Cost']} />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Add New Program Form */}
        {isAddingNew && (
          <Card className="mb-8 border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800">Add New Program</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <Label htmlFor="new-name">Program Name</Label>
                  <Input
                    id="new-name"
                    value={newProgram.name}
                    onChange={(e) => setNewProgram({...newProgram, name: e.target.value})}
                    placeholder="Enter program name"
                  />
                </div>
                <div>
                  <Label htmlFor="new-description">Description</Label>
                  <Input
                    id="new-description"
                    value={newProgram.description}
                    onChange={(e) => setNewProgram({...newProgram, description: e.target.value})}
                    placeholder="Brief description"
                  />
                </div>
                <div>
                  <Label htmlFor="new-category">Category</Label>
                  <Input
                    id="new-category"
                    value={newProgram.category}
                    onChange={(e) => setNewProgram({...newProgram, category: e.target.value})}
                    placeholder="e.g. Design, CRM"
                  />
                </div>
                <div>
                  <Label htmlFor="new-users">Users</Label>
                  <Input
                    id="new-users"
                    type="number"
                    value={newProgram.users}
                    onChange={(e) => setNewProgram({...newProgram, users: parseInt(e.target.value) || 0})}
                    placeholder="Number of users"
                  />
                </div>
                <div>
                  <Label htmlFor="new-cost">Monthly Cost/User</Label>
                  <Input
                    id="new-cost"
                    type="number"
                    step="0.01"
                    value={newProgram.monthlyCost}
                    onChange={(e) => setNewProgram({...newProgram, monthlyCost: parseFloat(e.target.value) || 0})}
                    placeholder="Cost per user"
                  />
                </div>
              </div>
              <div className="flex space-x-2 mt-4">
                <Button onClick={addNewProgram} className="bg-green-600 hover:bg-green-700">
                  <Save className="h-4 w-4 mr-2" />
                  Add Program
                </Button>
                <Button variant="outline" onClick={() => setIsAddingNew(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Programs Table */}
        <Card>
          <CardHeader>
            <CardTitle>Program Details</CardTitle>
            <CardDescription>
              Total Monthly Cost: <span className="text-2xl font-bold text-blue-600">${totalMonthlyCost.toLocaleString()}</span>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {programs.map((program) => (
                <div key={program.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  {editingId === program.id ? (
                    // Edit Mode
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end">
                      <div>
                        <Label>Name</Label>
                        <Input
                          value={editForm.name}
                          onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Input
                          value={editForm.description}
                          onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Category</Label>
                        <Input
                          value={editForm.category}
                          onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label>Users</Label>
                        <Input
                          type="number"
                          value={editForm.users}
                          onChange={(e) => setEditForm({...editForm, users: parseInt(e.target.value)})}
                        />
                      </div>
                      <div>
                        <Label>Cost/User</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={editForm.monthlyCost}
                          onChange={(e) => setEditForm({...editForm, monthlyCost: parseFloat(e.target.value)})}
                        />
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={saveEdit}>
                          <Save className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={cancelEdit}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div className="flex items-center justify-between">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4">
                        <div>
                          <div className="font-semibold">{program.name}</div>
                          <div className="text-sm text-gray-500">{program.description}</div>
                        </div>
                        <div className="text-center">
                          <Badge variant="secondary">{program.category}</Badge>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">{program.users}</div>
                          <div className="text-sm text-gray-500">users</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold">${program.monthlyCost}</div>
                          <div className="text-sm text-gray-500">per user</div>
                        </div>
                        <div className="text-center">
                          <div className="font-bold text-blue-600">${(program.monthlyCost * program.users).toLocaleString()}</div>
                          <div className="text-sm text-gray-500">total monthly</div>
                        </div>
                      </div>
                      <div className="flex space-x-2 ml-4">
                        <Button size="sm" variant="outline" onClick={() => startEdit(program)}>
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => deleteProgram(program.id)} className="text-red-600 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;

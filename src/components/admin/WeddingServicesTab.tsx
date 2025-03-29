
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from '@/components/ui/use-toast';

// Sample data
const weddingServices = [
  { id: 1, name: 'Elegant Stage Decoration', subcategory: 'stage', price: 85000, active: true },
  { id: 2, name: 'Royal Gate Decoration', subcategory: 'gate', price: 35000, active: true },
  { id: 3, name: 'Gallery Walkway Decoration', subcategory: 'gallery', price: 45000, active: true },
  { id: 4, name: 'Traditional Mandap Setup', subcategory: 'mandap', price: 70000, active: true },
  { id: 5, name: 'Complete Wedding Package', subcategory: 'complete', price: 200000, active: true },
  { id: 6, name: 'Wedding Reception Decor', subcategory: 'reception', price: 65000, active: true },
  { id: 7, name: 'Royal Stage Setup', subcategory: 'stage', price: 120000, active: true },
  { id: 8, name: 'Contemporary Mandap Design', subcategory: 'mandap', price: 85000, active: true },
];

const WeddingServicesTab = () => {
  const { toast } = useToast();
  const [services, setServices] = useState(weddingServices);
  const [newService, setNewService] = useState({
    name: '',
    subcategory: 'stage',
    price: 0,
    active: true,
    image: null as File | null,
    video: null as File | null,
    description: '',
    features: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewService(prev => ({ ...prev, [name]: name === 'price' ? Number(value) : value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const { name } = e.target;
      setNewService(prev => ({ ...prev, [name]: e.target.files![0] }));
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newService.name || newService.price <= 0 || !newService.image) {
      toast({
        title: "Invalid input",
        description: "Please fill in all required fields with valid values",
        variant: "destructive"
      });
      return;
    }
    
    const newId = Math.max(...services.map(s => s.id)) + 1;
    setServices([...services, { 
      id: newId, 
      name: newService.name,
      subcategory: newService.subcategory,
      price: newService.price,
      active: newService.active
    }]);
    
    toast({
      title: "Service added",
      description: `${newService.name} has been added to the wedding services`,
    });
    
    // Reset form
    setNewService({
      name: '',
      subcategory: 'stage',
      price: 0,
      active: true,
      image: null,
      video: null,
      description: '',
      features: ''
    });
  };
  
  const toggleServiceStatus = (id: number) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, active: !service.active } : service
    ));
    
    const service = services.find(s => s.id === id);
    
    toast({
      title: service?.active ? "Service deactivated" : "Service activated",
      description: `${service?.name} has been ${service?.active ? 'deactivated' : 'activated'}`,
    });
  };
  
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="font-serif text-xl font-semibold mb-4">Add New Wedding Service</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Service Name*</label>
              <Input
                name="name"
                value={newService.name}
                onChange={handleInputChange}
                placeholder="Enter service name"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Subcategory*</label>
              <select
                name="subcategory"
                value={newService.subcategory}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded-md"
                required
              >
                <option value="stage">Stage Decoration</option>
                <option value="mandap">Mandap Decoration</option>
                <option value="gate">Gate Decoration</option>
                <option value="gallery">Gallery Decoration</option>
                <option value="reception">Reception Decoration</option>
                <option value="complete">Complete Package</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Price (₹)*</label>
              <Input
                type="number"
                name="price"
                value={newService.price}
                onChange={handleInputChange}
                placeholder="Enter price"
                required
                min="0"
              />
            </div>
            
            <div className="flex items-center space-x-2 pt-8">
              <Checkbox 
                id="active" 
                checked={newService.active}
                onCheckedChange={(checked) => setNewService(prev => ({...prev, active: checked === true }))}
              />
              <label
                htmlFor="active"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Active
              </label>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Main Image*</label>
              <Input
                type="file"
                name="image"
                onChange={handleFileChange}
                accept="image/*"
                required
              />
              <p className="text-xs text-gray-500">This will be the main image of the service</p>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Video (optional)</label>
              <Input
                type="file"
                name="video"
                onChange={handleFileChange}
                accept="video/*"
              />
              <p className="text-xs text-gray-500">Upload a short video preview</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Description*</label>
            <textarea
              name="description"
              value={newService.description}
              onChange={handleInputChange}
              placeholder="Enter service description"
              className="w-full px-3 py-2 border rounded-md"
              rows={3}
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Features (one per line)*</label>
            <textarea
              name="features"
              value={newService.features}
              onChange={handleInputChange}
              placeholder="Enter service features (one feature per line)"
              className="w-full px-3 py-2 border rounded-md"
              rows={4}
              required
            />
            <p className="text-xs text-gray-500">Enter each feature on a new line</p>
          </div>
          
          <Button type="submit">Add Service</Button>
        </form>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="font-serif text-xl font-semibold mb-4">Wedding Services</h2>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Subcategory</TableHead>
                <TableHead>Price (₹)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>{service.id}</TableCell>
                  <TableCell>{service.name}</TableCell>
                  <TableCell className="capitalize">{service.subcategory}</TableCell>
                  <TableCell>₹{service.price.toLocaleString()}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      service.active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {service.active ? 'Active' : 'Inactive'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toggleServiceStatus(service.id)}
                      >
                        {service.active ? 'Deactivate' : 'Activate'}
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-gray-500"
                      >
                        Edit
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default WeddingServicesTab;

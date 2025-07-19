import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  Image, 
  Calendar, 
  FileText, 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  Upload,
  X,
  Eye,
  LogOut,
  Home,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const { logout } = useAuth();
  const { galleryImages, setGalleryImages, bookings, setBookings } = useData();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Gallery management
  const [newImage, setNewImage] = useState({ src: '', alt: '', category: 'puppies' });
  const [editingImage, setEditingImage] = useState(null);

  // Booking management
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Content management
  const [siteContent, setSiteContent] = useState({
    heroTitle: 'Hibrid Shopp',
    heroSubtitle: 'Prémium hibrid kutyafajták szeretettel és gondossággal',
    aboutText: 'Több mint 10 éves tapasztalattal rendelkezünk a hibrid kutyafajták tenyésztésében',
    contactPhone: '0036 70 217 8885',
    contactEmail: 'shoppdogg583@gmail.com',
    instagram: '@hibridshopp'
  });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewImage(prev => ({ ...prev, src: e.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addImage = () => {
    if (newImage.src && newImage.alt) {
      const image = {
        id: Date.now(),
        ...newImage
      };
      setGalleryImages(prev => [...prev, image]);
      setNewImage({ src: '', alt: '', category: 'puppies' });
    }
  };

  const deleteImage = (id) => {
    setGalleryImages(prev => prev.filter(img => img.id !== id));
  };

  const updateBookingStatus = (id, status) => {
    setBookings(prev => prev.map(booking => 
      booking.id === id ? { ...booking, status } : booking
    ));
  };

  const deleteBooking = (id) => {
    setBookings(prev => prev.filter(booking => booking.id !== id));
  };

  const menuItems = [
    { id: 'dashboard', label: 'Áttekintés', icon: Home },
    { id: 'gallery', label: 'Galéria', icon: Image },
    { id: 'bookings', label: 'Foglalások', icon: Calendar },
    { id: 'content', label: 'Tartalom', icon: FileText },
    { id: 'settings', label: 'Beállítások', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="hidden sm:flex"
            >
              <Eye className="mr-2 h-4 w-4" />
              Weboldal megtekintése
            </Button>
            <Button
              variant="outline"
              onClick={handleLogout}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Kijelentkezés
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out`}>
          <nav className="mt-8 px-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                      activeTab === item.id
                        ? 'bg-amber-100 text-amber-700 border-r-2 border-amber-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Overlay for mobile */}
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsMenuOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Dashboard */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-800">Áttekintés</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Összes kép</p>
                            <p className="text-3xl font-bold text-gray-800">{galleryImages.length}</p>
                          </div>
                          <Image className="h-8 w-8 text-amber-600" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Foglalások</p>
                            <p className="text-3xl font-bold text-gray-800">{bookings.length}</p>
                          </div>
                          <Calendar className="h-8 w-8 text-blue-600" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Függő foglalások</p>
                            <p className="text-3xl font-bold text-gray-800">
                              {bookings.filter(b => b.status === 'pending').length}
                            </p>
                          </div>
                          <Users className="h-8 w-8 text-orange-600" />
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-gray-600">Megerősített</p>
                            <p className="text-3xl font-bold text-gray-800">
                              {bookings.filter(b => b.status === 'confirmed').length}
                            </p>
                          </div>
                          <Settings className="h-8 w-8 text-green-600" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recent Bookings */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Legutóbbi foglalások</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {bookings.slice(0, 5).map((booking) => (
                          <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-semibold">{booking.name}</p>
                              <p className="text-sm text-gray-600">{booking.phone}</p>
                              <p className="text-sm text-gray-500">{booking.preferred_date}</p>
                            </div>
                            <Badge 
                              variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                            >
                              {booking.status === 'confirmed' ? 'Megerősítve' : 'Függő'}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Gallery Management */}
              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold text-gray-800">Galéria kezelése</h2>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-amber-600 hover:bg-amber-700">
                          <Plus className="mr-2 h-4 w-4" />
                          Új kép hozzáadása
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Új kép hozzáadása</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Kép feltöltése</label>
                            <Input
                              type="file"
                              accept="image/*"
                              onChange={handleImageUpload}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Leírás</label>
                            <Input
                              value={newImage.alt}
                              onChange={(e) => setNewImage(prev => ({ ...prev, alt: e.target.value }))}
                              placeholder="Kép leírása"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Kategória</label>
                            <select
                              value={newImage.category}
                              onChange={(e) => setNewImage(prev => ({ ...prev, category: e.target.value }))}
                              className="w-full p-2 border rounded-md"
                            >
                              <option value="puppies">Kiskutyák</option>
                              <option value="maltipoo">Maltipoo</option>
                              <option value="cavapoo">Cavapoo</option>
                              <option value="goldendoodle">Goldendoodle</option>
                              <option value="family">Családi</option>
                            </select>
                          </div>
                          {newImage.src && (
                            <div>
                              <img src={newImage.src} alt="Preview" className="w-full h-48 object-cover rounded-md" />
                            </div>
                          )}
                          <Button onClick={addImage} className="w-full">
                            <Save className="mr-2 h-4 w-4" />
                            Mentés
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {galleryImages.map((image) => (
                      <Card key={image.id} className="overflow-hidden">
                        <div className="relative">
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-2 right-2 flex space-x-2">
                            <Button
                              size="icon"
                              variant="destructive"
                              onClick={() => deleteImage(image.id)}
                              className="h-8 w-8"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <p className="text-sm font-medium">{image.alt}</p>
                          <Badge variant="outline" className="mt-2">
                            {image.category}
                          </Badge>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Bookings Management */}
              {activeTab === 'bookings' && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-800">Foglalások kezelése</h2>
                  
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <Card key={booking.id}>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start">
                            <div className="space-y-2">
                              <h3 className="text-lg font-semibold">{booking.name}</h3>
                              <p className="text-gray-600">📞 {booking.phone}</p>
                              {booking.email && <p className="text-gray-600">✉️ {booking.email}</p>}
                              <p className="text-gray-600">📅 {booking.preferred_date} - {booking.preferred_time}</p>
                              {booking.message && (
                                <p className="text-gray-600 bg-gray-50 p-3 rounded-md">
                                  💬 {booking.message}
                                </p>
                              )}
                              {booking.dog_name && (
                                <p className="text-gray-600">🐕 Érdeklődés: {booking.dog_name}</p>
                              )}
                            </div>
                            
                            <div className="flex flex-col space-y-2">
                              <Badge 
                                variant={booking.status === 'confirmed' ? 'default' : 
                                        booking.status === 'cancelled' ? 'destructive' : 'secondary'}
                              >
                                {booking.status === 'confirmed' ? 'Megerősítve' : 
                                 booking.status === 'cancelled' ? 'Törölve' : 'Függő'}
                              </Badge>
                              
                              <div className="flex space-x-2">
                                {booking.status === 'pending' && (
                                  <Button
                                    size="sm"
                                    onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    Megerősít
                                  </Button>
                                )}
                                {booking.status !== 'cancelled' && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                                    className="text-red-600 border-red-200 hover:bg-red-50"
                                  >
                                    Töröl
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => deleteBooking(booking.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                    
                    {bookings.length === 0 && (
                      <Card>
                        <CardContent className="p-12 text-center">
                          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                          <h3 className="text-lg font-semibold text-gray-600 mb-2">
                            Nincsenek foglalások
                          </h3>
                          <p className="text-gray-500">
                            A foglalások itt fognak megjelenni
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              )}

              {/* Content Management */}
              {activeTab === 'content' && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-800">Tartalom kezelése</h2>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Weboldal szövegek</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Főcím</label>
                        <Input
                          value={siteContent.heroTitle}
                          onChange={(e) => setSiteContent(prev => ({ ...prev, heroTitle: e.target.value }))}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Alcím</label>
                        <Textarea
                          value={siteContent.heroSubtitle}
                          onChange={(e) => setSiteContent(prev => ({ ...prev, heroSubtitle: e.target.value }))}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Rólunk szöveg</label>
                        <Textarea
                          value={siteContent.aboutText}
                          onChange={(e) => setSiteContent(prev => ({ ...prev, aboutText: e.target.value }))}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">Telefon</label>
                          <Input
                            value={siteContent.contactPhone}
                            onChange={(e) => setSiteContent(prev => ({ ...prev, contactPhone: e.target.value }))}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Email</label>
                          <Input
                            value={siteContent.contactEmail}
                            onChange={(e) => setSiteContent(prev => ({ ...prev, contactEmail: e.target.value }))}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-2">Instagram</label>
                          <Input
                            value={siteContent.instagram}
                            onChange={(e) => setSiteContent(prev => ({ ...prev, instagram: e.target.value }))}
                          />
                        </div>
                      </div>
                      
                      <Button className="bg-amber-600 hover:bg-amber-700">
                        <Save className="mr-2 h-4 w-4" />
                        Változtatások mentése
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Settings */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <h2 className="text-3xl font-bold text-gray-800">Beállítások</h2>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle>Admin beállítások</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Alert>
                        <Settings className="h-4 w-4" />
                        <AlertDescription>
                          Itt tudod módosítani az admin panel beállításait és a weboldal konfigurációját.
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Phone, Mail, Instagram, Clock, MapPin, Heart, Star, Calendar, Award, Shield, Users, ChevronRight, ChevronDown, Menu, X, MessageCircle, Settings, Plus, Edit, Trash2, LogOut, LogIn, Eye, EyeOff } from 'lucide-react'
import './App.css'

// Import dog images
import dog1 from './assets/371091897_839629824179864_1843142989333076425_n.jpg'
import dog2 from './assets/viber_kep_2025-06-12_17-57-52-976.jpg'
import dog3 from './assets/viber_kep_2025-06-12_17-57-51-752.jpg'
import dog4 from './assets/viber_kep_2025-06-12_17-57-52-245.jpg'
import dog5 from './assets/viber_kep_2025-06-12_17-54-15-104.jpg'
import dog6 from './assets/viber_kep_2025-06-12_17-54-04-740.jpg'

function App() {
  const [selectedDog, setSelectedDog] = useState(null)
  const [showBooking, setShowBooking] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  
  // Admin state-ek
  const [isAdmin, setIsAdmin] = useState(false)
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [showAdminPanel, setShowAdminPanel] = useState(false)
  const [adminUsername, setAdminUsername] = useState('')
  const [adminPassword, setAdminPassword] = useState('')
  const [showAddDog, setShowAddDog] = useState(false)
  const [showEditDog, setShowEditDog] = useState(false)
  const [editingDog, setEditingDog] = useState(null)
  const [showPassword, setShowPassword] = useState(false)
  
  // Új admin funkciók
  const [adminActiveTab, setAdminActiveTab] = useState('dogs')
  const [showSiteSettings, setShowSiteSettings] = useState(false)
  const [showTextEditor, setShowTextEditor] = useState(false)
  const [showBookingManager, setShowBookingManager] = useState(false)
  const [showStatistics, setShowStatistics] = useState(false)
  const [editingText, setEditingText] = useState('')
  const [editingTextKey, setEditingTextKey] = useState('')

  // Oldal beállítások
  const [siteSettings, setSiteSettings] = useState({
    siteTitle: 'Hibrid Shopp',
    siteSubtitle: 'Prémium Kutyatenyésztés',
    phoneNumber: '+3670217885',
    email: 'info@hibridshopp.hu',
    address: 'Budapest, Magyarország',
    openingHours: 'Hétfő-Vasárnap: 9:00-18:00',
    heroTitle: 'Találd meg a tökéletes társadat',
    heroSubtitle: 'Professzionális kutyatenyésztés szeretettel és gondossággal. Maltipoo, Uszkár, Cavapoo és Goldendoodle fajtákra specializálódtunk.',
    aboutText: 'Minden fajtánk gondosan kiválasztott szülőktől származik, garantálva az egészséget és a kiváló temperamentumot.',
    contactText: 'Vegye fel velünk a kapcsolatot, hogy megtekintse kiskutyáinkat és foglaljon időpontot.',
    footerText: '© 2024 Hibrid Shopp. Minden jog fenntartva.',
    whatsappNumber: '+3670217885',
    instagramHandle: '@hibridshopp',
    facebookPage: 'hibridshopp'
  })

  // Szövegek kezelése
  const [pageTexts, setPageTexts] = useState({
    breedsTitle: 'Fajtáink',
    breedsSubtitle: 'Minden fajtánk gondosan kiválasztott szülőktől származik, garantálva az egészséget és a kiváló temperamentumot.',
    availableTitle: 'Eladó Kutyáink',
    availableSubtitle: 'Minden kiskutyánk szeretettel nevelkedik családi környezetben, biztosítva a legjobb szocializációt.',
    galleryTitle: 'Galéria',
    gallerySubtitle: 'Nézd meg kiskutyáinkat akcióban és családi környezetben.',
    contactTitle: 'Kapcsolat',
    contactSubtitle: 'Vegye fel velünk a kapcsolatot és foglaljon időpontot kiskutyáink megtekintésére.',
    bookingTitle: 'Időpont Foglalása',
    bookingSubtitle: 'Foglaljon időpontot kiskutyáink megtekintésére',
    bookingSuccess: 'Időpont sikeresen lefoglalva! 24 órán belül felvesszük Önnel a kapcsolatot a megerősítéshez.',
    bookingError: 'Hiba történt az időpont foglalás során: ',
    adminLoginTitle: 'Admin Bejelentkezés',
    adminLoginSubtitle: 'Adja meg az admin jelszót',
    adminPanelTitle: 'Admin Panel',
    adminPanelSubtitle: 'Kutyák és foglalások kezelése'
  })

  // Időpontok kezelése
  const [timeSlots, setTimeSlots] = useState([
    '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
  ])

  // Statisztikák
  const [statistics, setStatistics] = useState({
    totalDogs: 6,
    availableDogs: 6,
    totalBookings: 12,
    activeBookings: 8,
    monthlyVisitors: 1250,
    conversionRate: 15.2
  })

  // Scroll spy effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'breeds', 'available', 'gallery', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ESC key to close modals
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        if (showBooking) {
          setShowBooking(false)
        }
        if (selectedDog) {
          setSelectedDog(null)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showBooking, selectedDog])

  // Click outside to close modals
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showBooking && event.target.classList.contains('modal-overlay')) {
        setShowBooking(false)
      }
      if (selectedDog && event.target.classList.contains('modal-overlay')) {
        setSelectedDog(null)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [showBooking, selectedDog])

  const handleBookingSubmit = async (formData) => {
    try {
      // Ellenőrizzük, hogy az időpont foglalt-e
      const isBooked = bookedSlots[formData.preferred_date]?.includes(formData.preferred_time);
      if (isBooked) {
        alert('Ez az időpont már foglalt! Kérjük válasszon másik időpontot.');
        return;
      }

      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const result = await response.json();
        
        // Hozzáadjuk az új foglalást a listához
        setBookedSlots(prev => ({
          ...prev,
          [formData.preferred_date]: [...(prev[formData.preferred_date] || []), formData.preferred_time]
        }));
        
        alert(pageTexts.bookingSuccess);
        setShowBooking(false);
        setBookingForm({
          name: '',
          phone: '',
          email: '',
          preferred_date: '',
          preferred_time: '9:00',
          message: '',
          dog_id: null,
          dog_name: null
        });
      } else {
        const error = await response.json();
        alert(pageTexts.bookingError + error.message);
      }
    } catch (error) {
      alert(pageTexts.bookingError + error.message);
    }
  };

  // Foglalt időpontok (példa adatok)
  const [bookedSlots, setBookedSlots] = useState({
    '2025-07-19': ['8:00', '10:00', '14:00', '18:00', '21:00'],
    '2025-07-20': ['9:00', '11:00', '16:00', '20:00'],
    '2025-07-21': ['8:00', '11:00', '14:00', '16:00', '18:00', '22:00']
  });

  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    email: '',
    preferred_date: '',
    preferred_time: '9:00',
    message: '',
    dog_id: null,
    dog_name: null
  });

  // Admin funkciók
  const handleAdminLogin = () => {
    if (adminUsername === 'Hibridadmin8' && adminPassword === 'Hibridadmin9988@') {
      setIsAdmin(true)
      setShowAdminLogin(false)
      setAdminUsername('')
      setAdminPassword('')
      alert('Sikeres bejelentkezés!')
    } else {
      alert('Hibás felhasználónév vagy jelszó!')
    }
  }

  const handleAdminLogout = () => {
    setIsAdmin(false)
    setShowAdminPanel(false)
    alert('Kijelentkezve!')
  }

  const handleAddDog = (newDog) => {
    const dogWithId = {
      ...newDog,
      id: Math.max(...availableDogs.map(dog => dog.id)) + 1
    }
    setAvailableDogs([...availableDogs, dogWithId])
    setShowAddDog(false)
    setStatistics(prev => ({
      ...prev,
      totalDogs: prev.totalDogs + 1,
      availableDogs: prev.availableDogs + 1
    }))
    alert('Kutya sikeresen hozzáadva!')
  }

  const handleEditDog = (updatedDog) => {
    setAvailableDogs(availableDogs.map(dog => 
      dog.id === updatedDog.id ? updatedDog : dog
    ))
    setShowEditDog(false)
    setEditingDog(null)
    alert('Kutya sikeresen módosítva!')
  }

  const handleDeleteDog = (dogId) => {
    if (confirm('Biztosan törölni szeretné ezt a kutyát?')) {
      setAvailableDogs(availableDogs.filter(dog => dog.id !== dogId))
      setStatistics(prev => ({
        ...prev,
        totalDogs: prev.totalDogs - 1,
        availableDogs: prev.availableDogs - 1
      }))
      alert('Kutya sikeresen törölve!')
    }
  }

  const handleCancelBooking = (date, time) => {
    setBookedSlots(prev => ({
      ...prev,
      [date]: prev[date]?.filter(t => t !== time) || []
    }))
    setStatistics(prev => ({
      ...prev,
      activeBookings: prev.activeBookings - 1
    }))
    alert(`Foglalás törölve: ${date} ${time}`)
  }

  // Képfeltöltés kezelése
  const handleImageUpload = (event, setImageUrl) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Új kutya form state
  const [newDogForm, setNewDogForm] = useState({
    name: '',
    breed: '',
    age: '',
    price: '',
    image: dog1, // alapértelmezett kép
    description: '',
    gender: 'Fiú',
    vaccinated: true,
    microchipped: true,
    weight: '',
    parents: '',
    temperament: '',
    specialFeatures: [],
    category: 'maltipoo'
  });

  // Szerkesztési form state
  const [editDogForm, setEditDogForm] = useState({
    name: '',
    breed: '',
    age: '',
    price: '',
    image: '',
    description: '',
    gender: 'Fiú',
    vaccinated: true,
    microchipped: true,
    weight: '',
    parents: '',
    temperament: '',
    specialFeatures: [],
    category: 'maltipoo'
  });

  const [availableDogs, setAvailableDogs] = useState([
    {
      id: 1,
      name: "Carlos",
      breed: "Maltipoo",
      age: "9 hetes",
      price: "350.000 Ft",
      image: dog1,
      description: "Második generációs Maltipoo, gyönyörű vörös-barna göndör szőrzet, nagyon játékos és szeretetteljes természet. Carlos egy igazi családi kedvenc, aki imádja a gyerekeket és könnyen alkalmazkodik új környezethez.",
      gender: "Fiú",
      vaccinated: true,
      microchipped: true,
      weight: "2.5 kg",
      parents: "Máltai selyemkutya anya × Toy uszkár apa",
      temperament: "Játékos, szeretetteljes, intelligens",
      specialFeatures: ["Hipoallergén szőrzet", "Könnyen tanítható", "Gyerekbarát", "Lakásban tartható"],
      category: "maltipoo"
    },
    {
      id: 2,
      name: "Joker",
      breed: "Maltipoo",
      age: "8 hetes",
      price: "320.000 Ft",
      image: dog2,
      description: "Második generációs Maltipoo, fehér-barna hosszú szőrzet, szelíd és nyugodt természet. Joker tökéletes választás azoknak, akik egy békés, kiegyensúlyozott kutyust keresnek.",
      gender: "Fiú",
      vaccinated: true,
      microchipped: true,
      weight: "2.2 kg",
      parents: "Máltai selyemkutya anya × Toy uszkár apa",
      temperament: "Szelíd, nyugodt, ragaszkodó",
      specialFeatures: ["Hosszú, selymes szőrzet", "Nyugodt természet", "Ideális társkutya", "Könnyen kezelhető"],
      category: "maltipoo"
    },
    {
      id: 3,
      name: "Charlie",
      breed: "Maltipoo",
      age: "9 hetes",
      price: "340.000 Ft",
      image: dog3,
      description: "Krém-barna göndör szőrzet, nagyon intelligens és tanítható. Charlie egy kivételesen okos kölyök, aki gyorsan megtanulja a parancsokat.",
      gender: "Kan",
      vaccinated: true,
      microchipped: true,
      weight: "2.8 kg",
      parents: "Máltai selyemkutya anya × Miniature uszkár apa",
      temperament: "Intelligens, aktív, tanulékony",
      specialFeatures: ["Rendkívül okos", "Gyorsan tanul", "Aktív természet", "Kiváló családi kutya"],
      category: "maltipoo"
    },
    {
      id: 4,
      name: "Fanto",
      breed: "Cavapoo",
      age: "15 hetes",
      price: "200.000 Ft",
      image: dog4,
      description: "Barna göndör szőrzet, imádja a szabadtéri tevékenységeket. Fanto egy energikus, kalandvágyó kölyök, aki tökéletes aktív családoknak.",
      gender: "Fiú",
      vaccinated: true,
      microchipped: true,
      weight: "3.1 kg",
      parents: "Cavalier King Charles spániel anya × Toy uszkár apa",
      temperament: "Energikus, barátságos, kalandvágyó",
      specialFeatures: ["Szabadtér szerető", "Nagyon barátságos", "Jó egészség", "Aktív életmódhoz ideális"],
      category: "cavapoo"
    },
    {
      id: 5,
      name: "Max és Buddy",
      breed: "Labrador és Maltipoo",
      age: "Felnőtt és 6 hetes",
      price: "280.000 Ft",
      image: dog5,
      description: "Arany Labrador és imádnivaló Maltipoo kölyök különleges páros. Max, a tapasztalt Labrador segít Buddy, a kis Maltipoo szocializációjában.",
      gender: "Vegyes",
      vaccinated: true,
      microchipped: true,
      weight: "25 kg + 1.8 kg",
      parents: "Labrador (Max) + Maltipoo kölyök (Buddy)",
      temperament: "Barátságos, védelmező, játékos",
      specialFeatures: ["Különleges páros", "Tapasztalt kutya + kölyök", "Kiváló szocializáció", "Családi környezethez"],
      category: "special"
    },
    {
      id: 6,
      name: "Coco",
      breed: "Maltipoo",
      age: "7 hetes",
      price: "360.000 Ft",
      image: dog6,
      description: "Vörös-barna göndör szőrzet, nagyon aktív és társaságkedvelő természet. Coco egy igazi kis energiabomba, aki mindig jó hangulatot teremt.",
      gender: "Szuka",
      vaccinated: true,
      microchipped: true,
      weight: "2.0 kg",
      parents: "Máltai selyemkutya anya × Toy uszkár apa",
      temperament: "Aktív, társaságkedvelő, vidám",
      specialFeatures: ["Nagyon aktív", "Társaságkedvelő", "Vidám természet", "Kiváló játszótárs"],
      category: "maltipoo"
    }
  ]);

  const breeds = [
    {
      name: "Maltipoo",
      description: "A máltai selyemkutya és az intelligens uszkár keresztezése. Ez a kis termetű, vidám keverék tökéletes választás lakásba vagy családba egyaránt.",
      traits: ["Okos és könnyen tanítható", "Ragaszkodó, bújós és gyerekbarát", "Alig vedlik - allergiásoknak is jó", "Játékos, aktív, mégis alkalmazkodó"],
      availableDogs: availableDogs.filter(dog => dog.category === "maltipoo"),
      icon: "🐕",
      gradient: "from-orange-400 to-red-400"
    },
    {
      name: "Uszkár",
      description: "Az uszkár az egyik legintelligensebb kutyafajta, amely nemcsak gyönyörű megjelenésével, hanem barátságos természetével is meghódítja a szíveket.",
      traits: ["Rendkívül okos és könnyen tanítható", "Családcentrikus és hűséges társ", "Göndör, alig vedlő szőrzet", "Aktív, játékos és nagyon alkalmazkodó"],
      availableDogs: [],
      icon: "🦮",
      gradient: "from-blue-400 to-purple-400"
    },
    {
      name: "Cavapoo/Cockapoo",
      description: "A Cocker spániel/Cavalier King Spániel és az Uszkár keresztezése. Vidám, intelligens, szeretetre méltó fajta.",
      traits: ["Okos, könnyen tanul", "Játékos és ragaszkodó", "Szőrzetük göndör vagy hullámos", "Tökéletes választás családoknak"],
      availableDogs: availableDogs.filter(dog => dog.category === "cavapoo"),
      icon: "🐶",
      gradient: "from-green-400 to-teal-400"
    },
    {
      name: "Goldendoodle",
      description: "A barátságos Golden Retriever és az intelligens Uszkár keresztezéséből született vidám, játékos és hűséges kutya.",
      traits: ["Nagyon okos, könnyen tanítható", "Barátságos, szeretetéhes", "Szőrzete göndör vagy hullámos", "Imád játszani, mozogni"],
      availableDogs: [],
      icon: "🦴",
      gradient: "from-yellow-400 to-orange-400"
    }
  ]

  const formatDateForInput = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const formatDateFromInput = (dateString) => {
    if (!dateString) return '';
    const [day, month, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  // Új admin funkciók
  const handleUpdateSiteSettings = (newSettings) => {
    setSiteSettings(newSettings)
    setShowSiteSettings(false)
    alert('Oldal beállítások sikeresen frissítve!')
  }

  const handleUpdatePageTexts = (newTexts) => {
    setPageTexts(newTexts)
    setShowTextEditor(false)
    alert('Szövegek sikeresen frissítve!')
  }

  const handleAddTimeSlot = (time) => {
    if (!timeSlots.includes(time)) {
      setTimeSlots([...timeSlots, time].sort())
      alert('Időpont sikeresen hozzáadva!')
    } else {
      alert('Ez az időpont már létezik!')
    }
  }

  const handleRemoveTimeSlot = (time) => {
    setTimeSlots(timeSlots.filter(t => t !== time))
    alert('Időpont sikeresen eltávolítva!')
  }

  const handleEditText = (key, text) => {
    setEditingTextKey(key)
    setEditingText(text)
    setShowTextEditor(true)
  }

  const handleSaveText = () => {
    if (editingTextKey.startsWith('site')) {
      setSiteSettings(prev => ({
        ...prev,
        [editingTextKey]: editingText
      }))
    } else {
      setPageTexts(prev => ({
        ...prev,
        [editingTextKey]: editingText
      }))
    }
    setShowTextEditor(false)
    setEditingText('')
    setEditingTextKey('')
    alert('Szöveg sikeresen mentve!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-amber-50 relative overflow-x-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-200/30 to-amber-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-pink-200/20 to-rose-200/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md shadow-2xl sticky top-0 z-50 border-b border-orange-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-400 via-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-all duration-300">
                  <Heart className="w-7 h-7 text-white animate-pulse" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  {siteSettings.siteTitle}
                </h1>
                <p className="text-sm text-gray-600 font-medium">{siteSettings.siteSubtitle}</p>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8">
              {[
                { id: 'home', label: 'Főoldal' },
                { id: 'breeds', label: 'Fajták' },
                { id: 'available', label: 'Eladó Kutyák' },
                { id: 'gallery', label: 'Galéria' },
                { id: 'contact', label: 'Kapcsolat' }
              ].map((item) => (
                <a 
                  key={item.id}
                  href={`#${item.id}`} 
                  className={`relative text-gray-700 hover:text-orange-500 transition-all duration-300 font-medium group ${
                    activeSection === item.id ? 'text-orange-500' : ''
                  }`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-300 group-hover:w-full ${
                    activeSection === item.id ? 'w-full' : ''
                  }`}></span>
                </a>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button 
              className="lg:hidden p-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button 
                variant="outline"
                onClick={() => window.open(`tel:${siteSettings.phoneNumber}`, '_self')}
                className="border-2 border-green-500 hover:bg-green-50 text-green-600 hover:text-green-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-xl px-4 py-3"
              >
                <Phone className="w-4 h-4 mr-2" />
                {siteSettings.phoneNumber}
              </Button>
              <Button 
                onClick={() => setShowBooking(true)}
                className="bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-600 hover:via-amber-600 hover:to-yellow-600 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-xl px-6 py-3"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Időpont Foglalás
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 p-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-orange-100">
              <nav className="flex flex-col space-y-3">
                {[
                  { id: 'home', label: 'Főoldal' },
                  { id: 'breeds', label: 'Fajták' },
                  { id: 'available', label: 'Eladó Kutyák' },
                  { id: 'gallery', label: 'Galéria' },
                  { id: 'contact', label: 'Kapcsolat' }
                ].map((item) => (
                  <a 
                    key={item.id}
                    href={`#${item.id}`} 
                    className="text-gray-700 hover:text-orange-500 transition-colors font-medium py-2 px-4 rounded-lg hover:bg-orange-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                ))}
                <Button 
                  variant="outline"
                  onClick={() => {
                    window.open(`tel:${siteSettings.phoneNumber}`, '_self')
                    setMobileMenuOpen(false)
                  }}
                  className="mt-4 border-2 border-green-500 hover:bg-green-50 text-green-600 hover:text-green-700 rounded-xl"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {siteSettings.phoneNumber}
                </Button>
                <Button 
                  onClick={() => {
                    setShowBooking(true)
                    setMobileMenuOpen(false)
                  }}
                  className="mt-4 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white rounded-xl"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Időpont Foglalás
                </Button>

              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative py-20 px-4 overflow-hidden">
        <div className="container mx-auto text-center relative z-10">
          <div className="mb-8 animate-fade-in-up">
            <h2 className="text-6xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
              {pageTexts.heroTitle}
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
              {pageTexts.heroSubtitle}
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 mb-16">
            {[
              { icon: Award, text: "Professzionális Tenyésztés", color: "from-blue-500 to-purple-500" },
              { icon: Shield, text: "Egészséggarancia", color: "from-green-500 to-teal-500" },
              { icon: Users, text: "24/7 Támogatás", color: "from-orange-500 to-red-500" }
            ].map((item, index) => (
              <div key={index} className="group">
                <Badge variant="secondary" className="text-lg py-3 px-6 bg-white/80 backdrop-blur-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 border border-gray-200/50 rounded-2xl">
                  <div className={`w-6 h-6 mr-3 rounded-lg bg-gradient-to-r ${item.color} p-1 flex items-center justify-center`}>
                    <item.icon className="w-4 h-4 text-white" />
                  </div>
                  {item.text}
                </Badge>
              </div>
            ))}
          </div>
          
          {/* Featured Dogs Preview */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            {availableDogs.slice(0, 3).map((dog, index) => (
              <div key={dog.id} className="group cursor-pointer" onClick={() => setSelectedDog(dog)}>
                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 bg-white/90 backdrop-blur-md border border-gray-200/50 rounded-3xl">
                  <div className="relative overflow-hidden">
                    <img 
                      src={dog.image} 
                      alt={dog.name}
                      className="w-full h-72 object-contain bg-gradient-to-br from-orange-50 to-amber-50 transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg rounded-xl px-3 py-1">
                      {dog.price}
                    </Badge>
                  </div>
                  <CardHeader className="text-center p-6">
                    <CardTitle className="text-2xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                      {dog.name}
                    </CardTitle>
                    <CardDescription className="text-orange-600 font-semibold text-lg">
                      {dog.breed}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Breeds Section */}
      <section id="breeds" className="py-20 px-4 bg-white/50 backdrop-blur-md relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold text-gray-800 mb-6">{pageTexts.breedsTitle}</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {pageTexts.breedsSubtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {breeds.map((breed, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/90 backdrop-blur-md border border-gray-200/50 rounded-3xl overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${breed.gradient}`}></div>
                <CardHeader className="text-center p-6">
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {breed.icon}
                  </div>
                  <CardTitle className="text-orange-600 text-xl font-bold mb-3">{breed.name}</CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">{breed.description}</CardDescription>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <ul className="space-y-3 mb-6">
                    {breed.traits.map((trait, i) => (
                      <li key={i} className="flex items-center text-sm text-gray-600">
                        <Star className="w-4 h-4 mr-3 text-amber-400 flex-shrink-0" />
                        {trait}
                      </li>
                    ))}
                  </ul>
                  {breed.availableDogs.length > 0 && (
                    <div className="mt-6">
                      <p className="text-sm font-semibold text-gray-700 mb-3">Elérhető kölykök:</p>
                      <div className="flex flex-wrap gap-2">
                        {breed.availableDogs.map((dog) => (
                          <Badge 
                            key={dog.id} 
                            variant="outline" 
                            className="text-xs cursor-pointer hover:bg-orange-100 hover:border-orange-300 transition-all duration-300 rounded-lg px-3 py-1"
                            onClick={() => setSelectedDog(dog)}
                          >
                            {dog.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Available Dogs Section */}
      <section id="available" className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold text-gray-800 mb-6">{pageTexts.availableTitle}</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {pageTexts.availableSubtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {availableDogs.map((dog, index) => (
              <Card key={dog.id} className="group overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 bg-white/90 backdrop-blur-md border border-gray-200/50 rounded-3xl">
                <div className="relative overflow-hidden">
                  <img 
                    src={dog.image} 
                    alt={dog.name}
                    className="w-full h-80 object-contain bg-gradient-to-br from-orange-50 to-amber-50 transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Badge className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg rounded-xl px-4 py-2 text-lg font-bold">
                    {dog.price}
                  </Badge>
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-white/90 text-gray-700 rounded-xl px-3 py-1">
                      {dog.age}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <CardTitle className="text-2xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300">
                        {dog.name}
                      </CardTitle>
                      <CardDescription className="text-orange-600 font-semibold text-lg">
                        {dog.breed}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className="rounded-xl px-3 py-1 border-orange-200 text-orange-600">
                      {dog.gender}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <p className="text-gray-600 mb-6 leading-relaxed">{dog.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    <Badge variant="secondary" className="rounded-lg px-3 py-1">Súly: {dog.weight}</Badge>
                    {dog.vaccinated && <Badge variant="secondary" className="rounded-lg px-3 py-1 bg-green-100 text-green-700">Oltott</Badge>}
                    {dog.microchipped && <Badge variant="secondary" className="rounded-lg px-3 py-1 bg-blue-100 text-blue-700">Chippelt</Badge>}
                  </div>
                  <div className="space-y-3 mb-6 text-sm">
                    <p><strong className="text-gray-700">Temperamentum:</strong> <span className="text-gray-600">{dog.temperament}</span></p>
                    <p><strong className="text-gray-700">Szülők:</strong> <span className="text-gray-600">{dog.parents}</span></p>
                  </div>
                  <Button 
                    className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-600 hover:via-amber-600 hover:to-yellow-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-xl py-3"
                    onClick={() => setSelectedDog(dog)}
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Részletek
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-4 bg-white/50 backdrop-blur-md relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold text-gray-800 mb-6">Galéria</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tekintse meg kiskutyáinkat különböző pillanatokban és környezetekben.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {availableDogs.map((dog, index) => (
              <div key={dog.id} className="group cursor-pointer" onClick={() => setSelectedDog(dog)}>
                <div className="relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                  <img 
                    src={dog.image} 
                    alt={dog.name}
                    className="w-full h-72 object-contain bg-gradient-to-br from-orange-50 to-amber-50 transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h4 className="text-2xl font-bold mb-2">{dog.name}</h4>
                    <p className="text-lg opacity-90">{dog.breed} • {dog.age}</p>
                    <p className="text-sm opacity-75 mt-2">{dog.temperament}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h3 className="text-5xl font-bold text-gray-800 mb-6">Kapcsolat</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Vegye fel velünk a kapcsolatot, és találja meg álmai kutyusát!
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h4 className="text-3xl font-semibold text-gray-800 mb-8">Elérhetőségek</h4>
              <div className="space-y-6">
                {[
                  { 
                    icon: Phone, 
                    text: "0670217885 (WhatsApp és Viber)", 
                    color: "from-green-500 to-emerald-500",
                    link: "https://wa.me/3670217885",
                    phone: "tel:+3670217885"
                  },
                  { icon: Mail, text: "shoppdogg583@gmail.com", color: "from-blue-500 to-cyan-500", link: "mailto:shoppdogg583@gmail.com" },
                  { icon: Clock, text: "Hétfő-Péntek: 8:00 - 22:00", color: "from-purple-500 to-pink-500" },
                  { icon: Instagram, text: "@hibridshopp", color: "from-pink-500 to-rose-500", link: "https://www.instagram.com/hibridshopp" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4 group">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transform group-hover:scale-110 transition-all duration-300`}>
                      <item.icon className="w-6 h-6 text-white" />
                    </div>
                    {item.link ? (
                      <a 
                        href={item.link} 
                        className="text-gray-700 hover:text-orange-600 transition-colors duration-300 text-lg font-medium cursor-pointer"
                        target={item.link.startsWith('http') ? "_blank" : undefined}
                        rel={item.link.startsWith('http') ? "noopener noreferrer" : undefined}
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span className="text-gray-700 text-lg font-medium">{item.text}</span>
                    )}
                  </div>
                ))}

                
                {/* WhatsApp gomb */}
                <div className="mt-8">
                  <a 
                    href="https://wa.me/3670217885" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-6 py-4 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  >
                    <MessageCircle className="w-6 h-6" />
                    <span className="text-lg font-semibold">Időpont Foglalása</span>
                  </a>
                </div>
              </div>
            </div>
            
            <div>
              <Card className="bg-white/90 backdrop-blur-md border border-gray-200/50 rounded-3xl shadow-2xl overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-orange-500 to-amber-500"></div>
                <CardHeader className="p-8">
                  <CardTitle className="text-2xl font-bold text-gray-800">Időpont Foglalás</CardTitle>
                  <CardDescription className="text-gray-600 text-lg">
                    Foglaljon időpontot, hogy megismerje imádnivaló kiskutyáinkat
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <Button 
                    className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-600 hover:via-amber-600 hover:to-yellow-600 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-xl py-4 text-lg"
                    onClick={() => setShowBooking(true)}
                  >
                    <Calendar className="w-5 h-5 mr-3" />
                    Időpont Foglalása
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-amber-500/10"></div>
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                {siteSettings.siteTitle}
              </span>
            </div>
            <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
              {siteSettings.aboutText}
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="text-center">
              <h5 className="font-bold text-xl mb-4 text-orange-400">Elérhető Fajták</h5>
              <p className="text-gray-300">Maltipoo, Cavapoo, Goldendoodle</p>
            </div>
            <div className="text-center">
              <h5 className="font-bold text-xl mb-4 text-orange-400">Szolgáltatások</h5>
              <p className="text-gray-300">Tenyésztés, Tanácsadás, Utógondozás</p>
            </div>
            <div className="text-center">
              <h5 className="font-bold text-xl mb-4 text-orange-400">Garanciák</h5>
              <p className="text-gray-300">Egészséggarancia, Élethosszig tartó támogatás</p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-400">{siteSettings.footerText}</p>
              
              {/* Admin gombok - csak admin számára látható */}
              <div className="flex items-center space-x-3">
                {isAdmin ? (
                  <Button 
                    variant="outline"
                    onClick={() => setShowAdminPanel(true)}
                    className="border-2 border-purple-500/50 hover:bg-purple-500/20 text-purple-300 hover:text-purple-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-xl px-4 py-2 text-sm"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Admin Panel
                  </Button>
                ) : (
                  <Button 
                    variant="outline"
                    onClick={() => setShowAdminLogin(true)}
                    className="border-2 border-purple-500/50 hover:bg-purple-500/20 text-purple-300 hover:text-purple-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-xl px-4 py-2 text-sm"
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Admin
                  </Button>
                )}
                {isAdmin && (
                  <Button 
                    variant="outline"
                    onClick={handleAdminLogout}
                    className="border-2 border-red-500/50 hover:bg-red-500/20 text-red-300 hover:text-red-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-xl px-4 py-2 text-sm"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Kijelentkezés
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Dog Detail Modal */}
      {selectedDog && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 modal-overlay">
          <Card className="max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-white/95 backdrop-blur-md border border-gray-200/50 rounded-3xl shadow-2xl">
            <CardHeader className="p-8">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-4xl font-bold text-gray-800 mb-2">{selectedDog.name}</CardTitle>
                  <CardDescription className="text-orange-600 font-semibold text-2xl">
                    {selectedDog.breed}
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedDog(null)}
                  className="rounded-xl p-3 hover:bg-red-50 hover:border-red-300 transition-colors duration-300 border-2"
                  title="Bezárás"
                >
                  <X className="w-6 h-6 text-gray-600 hover:text-red-600" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-8 pt-0">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <img 
                    src={selectedDog.image} 
                    alt={selectedDog.name}
                    className="w-full h-96 object-contain bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl mb-6 shadow-lg"
                  />
                </div>
                <div>
                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <strong className="text-gray-700">Kor:</strong>
                      <p className="text-gray-600 text-lg">{selectedDog.age}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <strong className="text-gray-700">Nem:</strong>
                      <p className="text-gray-600 text-lg">{selectedDog.gender}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <strong className="text-gray-700">Ár:</strong>
                      <p className="text-orange-600 text-lg font-bold">{selectedDog.price}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl">
                      <strong className="text-gray-700">Súly:</strong>
                      <p className="text-gray-600 text-lg">{selectedDog.weight}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-xl">
                      <strong className="text-gray-700">Szülők:</strong>
                      <p className="text-gray-600">{selectedDog.parents}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-xl">
                      <strong className="text-gray-700">Temperamentum:</strong>
                      <p className="text-gray-600">{selectedDog.temperament}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed text-lg">{selectedDog.description}</p>
                  
                  <div className="mb-6">
                    <strong className="text-gray-700 text-lg">Különleges tulajdonságok:</strong>
                    <ul className="list-none mt-3 space-y-2">
                      {selectedDog.specialFeatures.map((feature, index) => (
                        <li key={index} className="flex items-center text-gray-600">
                          <Star className="w-4 h-4 mr-3 text-amber-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mb-8">
                    {selectedDog.vaccinated && (
                      <Badge variant="secondary" className="bg-green-100 text-green-700 px-4 py-2 rounded-xl">
                        Oltott
                      </Badge>
                    )}
                    {selectedDog.microchipped && (
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl">
                        Chippelt
                      </Badge>
                    )}
                    <Badge variant="secondary" className="bg-orange-100 text-orange-700 px-4 py-2 rounded-xl">
                      Egészséggarancia
                    </Badge>
                    <Badge variant="secondary" className="bg-purple-100 text-purple-700 px-4 py-2 rounded-xl">
                      Utógondozás
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex gap-4 mt-8">
                <Button 
                  className="flex-1 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-600 hover:via-amber-600 hover:to-yellow-600 text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 rounded-xl py-4 text-lg"
                  onClick={() => {
                    setBookingForm({
                      ...bookingForm,
                      dog_id: selectedDog.id,
                      dog_name: selectedDog.name
                    })
                    setSelectedDog(null)
                    setShowBooking(true)
                  }}
                >
                  <Calendar className="w-5 h-5 mr-3" />
                  Időpont Foglalása
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 border-2 border-orange-200 hover:bg-orange-50 rounded-xl py-4 text-lg"
                  onClick={() => window.open(`tel:${siteSettings.phoneNumber}`, '_self')}
                >
                  <Phone className="w-5 h-5 mr-3" />
                  Hívás Most!
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 modal-overlay animate-in fade-in duration-300">
          <Card className="w-full max-w-md bg-white/98 backdrop-blur-xl border-0 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] animate-in zoom-in-95 duration-300">
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl font-bold text-white">Admin Bejelentkezés</CardTitle>
                  <CardDescription className="text-purple-100">Adja meg az admin jelszót</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setShowAdminLogin(false)}
                  className="rounded-full p-2 hover:bg-white/20 hover:border-white/30 transition-all duration-300 border-2 border-white/30"
                >
                  <X className="w-4 h-4 text-white" />
                </Button>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Felhasználónév</label>
                  <input 
                    type="text"
                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300"
                    placeholder="Adja meg a felhasználónevet"
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                  />
                </div>
                <div className="relative">
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Jelszó</label>
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"}
                      className="w-full p-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 pr-12"
                      placeholder="Adja meg a jelszót"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <Button 
                  className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-xl py-4 text-lg font-bold"
                  onClick={handleAdminLogin}
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  Bejelentkezés
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Admin Panel Modal */}
      {showAdminPanel && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 modal-overlay animate-in fade-in duration-300">
          <Card className="w-full max-w-7xl max-h-[95vh] bg-white/98 backdrop-blur-xl border-0 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl font-bold text-white">Admin Panel - Teljes Irányítás</CardTitle>
                  <CardDescription className="text-purple-100">Kutyák, foglalások, beállítások és szövegek kezelése</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline"
                    onClick={() => setShowAddDog(true)}
                    className="border-white/30 text-white hover:bg-white/20"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Új Kutya
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleAdminLogout}
                    className="border-white/30 text-white hover:bg-white/20"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Kijelentkezés
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAdminPanel(false)}
                    className="border-white/30 text-white hover:bg-white/20"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Tab Navigation */}
            <div className="bg-gray-50 border-b border-gray-200">
              <div className="flex space-x-1 p-4">
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
                  { id: 'dogs', label: 'Kutyák', icon: '🐕' },
                  { id: 'bookings', label: 'Foglalások', icon: '📅' },
                  { id: 'settings', label: 'Beállítások', icon: '⚙️' },
                  { id: 'texts', label: 'Szövegek', icon: '📝' },
                  { id: 'times', label: 'Időpontok', icon: '🕐' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setAdminActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      adminActiveTab === tab.id
                        ? 'bg-purple-500 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(95vh-200px)]">
              {/* Dashboard Tab */}
              {adminActiveTab === 'dashboard' && (
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Dashboard - Áttekintés</h3>
                  
                  {/* Statisztikák */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-blue-100">Összes Kutya</p>
                            <p className="text-3xl font-bold">{statistics.totalDogs}</p>
                          </div>
                          <Heart className="w-8 h-8 text-blue-200" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-green-100">Eladó Kutyák</p>
                            <p className="text-3xl font-bold">{statistics.availableDogs}</p>
                          </div>
                          <Users className="w-8 h-8 text-green-200" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-orange-100">Aktív Foglalások</p>
                            <p className="text-3xl font-bold">{statistics.activeBookings}</p>
                          </div>
                          <Calendar className="w-8 h-8 text-orange-200" />
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-purple-100">Havi Látogatók</p>
                            <p className="text-3xl font-bold">{statistics.monthlyVisitors}</p>
                          </div>
                          <Eye className="w-8 h-8 text-purple-200" />
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Gyors műveletek */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <h4 className="text-lg font-semibold mb-4">Gyors Műveletek</h4>
                        <div className="space-y-3">
                          <Button 
                            onClick={() => setShowAddDog(true)}
                            className="w-full bg-green-500 hover:bg-green-600"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Új Kutya Hozzáadása
                          </Button>
                          <Button 
                            onClick={() => setShowSiteSettings(true)}
                            variant="outline"
                            className="w-full"
                          >
                            <Settings className="w-4 h-4 mr-2" />
                            Oldal Beállítások
                          </Button>
                          <Button 
                            onClick={() => setShowTextEditor(true)}
                            variant="outline"
                            className="w-full"
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Szövegek Szerkesztése
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <h4 className="text-lg font-semibold mb-4">Legutóbbi Foglalások</h4>
                        <div className="space-y-2">
                          {Object.entries(bookedSlots).slice(0, 5).map(([date, times]) => (
                            <div key={date} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                              <span className="text-sm font-medium">{formatDateForInput(date)}</span>
                              <span className="text-sm text-gray-600">{times.length} foglalás</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="hover:shadow-lg transition-all duration-300">
                      <CardContent className="p-6">
                        <h4 className="text-lg font-semibold mb-4">Rendszer Információk</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span>Elérhető időpontok:</span>
                            <span className="font-medium">{timeSlots.length}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Konverziós ráta:</span>
                            <span className="font-medium">{statistics.conversionRate}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Admin bejelentkezve:</span>
                            <span className="font-medium text-green-600">Igen</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}

              {/* Kutyák Tab */}
              {adminActiveTab === 'dogs' && (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">Kutyák Kezelése</h3>
                    <Button 
                      onClick={() => setShowAddDog(true)}
                      className="bg-green-500 hover:bg-green-600"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Új Kutya Hozzáadása
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {availableDogs.map(dog => (
                      <Card key={dog.id} className="hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <img src={dog.image} alt={dog.name} className="w-16 h-16 rounded-lg object-cover" />
                              <div>
                                <h4 className="font-semibold text-gray-800 text-lg">{dog.name}</h4>
                                <p className="text-sm text-gray-600">{dog.breed} - {dog.age}</p>
                                <p className="text-orange-600 font-bold">{dog.price}</p>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button 
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setEditingDog(dog)
                                  setEditDogForm({
                                    name: dog.name,
                                    breed: dog.breed,
                                    age: dog.age,
                                    price: dog.price,
                                    image: dog.image,
                                    description: dog.description,
                                    gender: dog.gender,
                                    vaccinated: dog.vaccinated,
                                    microchipped: dog.microchipped,
                                    weight: dog.weight,
                                    parents: dog.parents,
                                    temperament: dog.temperament,
                                    specialFeatures: dog.specialFeatures,
                                    category: dog.category
                                  })
                                  setShowEditDog(true)
                                }}
                                className="border-blue-300 text-blue-600 hover:bg-blue-50"
                              >
                                <Edit className="w-3 h-3 mr-1" />
                                Szerkesztés
                              </Button>
                              <Button 
                                size="sm"
                                variant="outline"
                                onClick={() => handleDeleteDog(dog.id)}
                                className="border-red-300 text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="w-3 h-3 mr-1" />
                                Törlés
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Foglalások Tab */}
              {adminActiveTab === 'bookings' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Foglalások Kezelése</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {Object.entries(bookedSlots).map(([date, times]) => (
                      <Card key={date} className="hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="font-semibold text-gray-800 text-lg">{formatDateForInput(date)}</h4>
                            <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                              {times.length} foglalás
                            </Badge>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {times.map(time => (
                              <Button 
                                key={time}
                                size="sm"
                                variant="outline"
                                onClick={() => handleCancelBooking(date, time)}
                                className="border-red-300 text-red-600 hover:bg-red-50"
                              >
                                {time} <X className="w-3 h-3 ml-1" />
                              </Button>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Beállítások Tab */}
              {adminActiveTab === 'settings' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Oldal Beállítások</h3>
                  <Card>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-semibold mb-2">Oldal Címe</label>
                            <input 
                              type="text"
                              value={siteSettings.siteTitle}
                              onChange={(e) => setSiteSettings({...siteSettings, siteTitle: e.target.value})}
                              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold mb-2">Alcím</label>
                            <input 
                              type="text"
                              value={siteSettings.siteSubtitle}
                              onChange={(e) => setSiteSettings({...siteSettings, siteSubtitle: e.target.value})}
                              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold mb-2">Telefonszám</label>
                            <input 
                              type="text"
                              value={siteSettings.phoneNumber}
                              onChange={(e) => setSiteSettings({...siteSettings, phoneNumber: e.target.value})}
                              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold mb-2">Email</label>
                            <input 
                              type="email"
                              value={siteSettings.email}
                              onChange={(e) => setSiteSettings({...siteSettings, email: e.target.value})}
                              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                            />
                          </div>
                        </div>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-semibold mb-2">Cím</label>
                            <input 
                              type="text"
                              value={siteSettings.address}
                              onChange={(e) => setSiteSettings({...siteSettings, address: e.target.value})}
                              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold mb-2">Nyitvatartás</label>
                            <input 
                              type="text"
                              value={siteSettings.openingHours}
                              onChange={(e) => setSiteSettings({...siteSettings, openingHours: e.target.value})}
                              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold mb-2">WhatsApp Szám</label>
                            <input 
                              type="text"
                              value={siteSettings.whatsappNumber}
                              onChange={(e) => setSiteSettings({...siteSettings, whatsappNumber: e.target.value})}
                              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold mb-2">Instagram</label>
                            <input 
                              type="text"
                              value={siteSettings.instagramHandle}
                              onChange={(e) => setSiteSettings({...siteSettings, instagramHandle: e.target.value})}
                              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 pt-6 border-t border-gray-200">
                        <Button 
                          onClick={() => handleUpdateSiteSettings(siteSettings)}
                          className="bg-purple-500 hover:bg-purple-600"
                        >
                          Beállítások Mentése
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Szövegek Tab */}
              {adminActiveTab === 'texts' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Szövegek Szerkesztése</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="text-lg font-semibold mb-4">Oldal Szövegek</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-semibold mb-2">Főoldal Cím</label>
                            <div className="flex">
                              <input 
                                type="text"
                                value={pageTexts.heroTitle}
                                onChange={(e) => setPageTexts({...pageTexts, heroTitle: e.target.value})}
                                className="flex-1 p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                              />
                              <Button 
                                size="sm"
                                variant="outline"
                                onClick={() => handleEditText('heroTitle', pageTexts.heroTitle)}
                                className="ml-2"
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold mb-2">Főoldal Alcím</label>
                            <textarea 
                              value={pageTexts.heroSubtitle}
                              onChange={(e) => setPageTexts({...pageTexts, heroSubtitle: e.target.value})}
                              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 h-20"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold mb-2">Fajták Címe</label>
                            <input 
                              type="text"
                              value={pageTexts.breedsTitle}
                              onChange={(e) => setPageTexts({...pageTexts, breedsTitle: e.target.value})}
                              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold mb-2">Eladó Kutyák Címe</label>
                            <input 
                              type="text"
                              value={pageTexts.availableTitle}
                              onChange={(e) => setPageTexts({...pageTexts, availableTitle: e.target.value})}
                              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <h4 className="text-lg font-semibold mb-4">Foglalás Szövegek</h4>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-semibold mb-2">Foglalás Címe</label>
                            <input 
                              type="text"
                              value={pageTexts.bookingTitle}
                              onChange={(e) => setPageTexts({...pageTexts, bookingTitle: e.target.value})}
                              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold mb-2">Sikeres Foglalás Üzenet</label>
                            <textarea 
                              value={pageTexts.bookingSuccess}
                              onChange={(e) => setPageTexts({...pageTexts, bookingSuccess: e.target.value})}
                              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 h-20"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold mb-2">Kapcsolat Címe</label>
                            <input 
                              type="text"
                              value={pageTexts.contactTitle}
                              onChange={(e) => setPageTexts({...pageTexts, contactTitle: e.target.value})}
                              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold mb-2">Kapcsolat Szöveg</label>
                            <textarea 
                              value={pageTexts.contactText}
                              onChange={(e) => setPageTexts({...pageTexts, contactText: e.target.value})}
                              className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 h-20"
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="mt-6">
                    <Button 
                      onClick={() => handleUpdatePageTexts(pageTexts)}
                      className="bg-purple-500 hover:bg-purple-600"
                    >
                      Szövegek Mentése
                    </Button>
                  </div>
                </div>
              )}

              {/* Időpontok Tab */}
              {adminActiveTab === 'times' && (
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Időpontok Kezelése</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <h4 className="text-lg font-semibold mb-4">Elérhető Időpontok</h4>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {timeSlots.map(time => (
                            <Badge 
                              key={time}
                              variant="secondary"
                              className="flex items-center space-x-2 bg-green-100 text-green-700"
                            >
                              <span>{time}</span>
                              <button
                                onClick={() => handleRemoveTimeSlot(time)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <div className="flex space-x-2">
                          <input 
                            type="time"
                            id="new-time"
                            className="p-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                          />
                          <Button 
                            onClick={() => {
                              const time = document.getElementById('new-time').value;
                              if (time) {
                                handleAddTimeSlot(time);
                                document.getElementById('new-time').value = '';
                              }
                            }}
                            className="bg-green-500 hover:bg-green-600"
                          >
                            <Plus className="w-4 h-4 mr-2" />
                            Hozzáadás
                          </Button>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <h4 className="text-lg font-semibold mb-4">Foglalt Időpontok</h4>
                        <div className="space-y-3">
                          {Object.entries(bookedSlots).map(([date, times]) => (
                            <div key={date} className="p-3 bg-red-50 rounded-lg border border-red-200">
                              <h5 className="font-semibold text-red-800 mb-2">{formatDateForInput(date)}</h5>
                              <div className="flex flex-wrap gap-2">
                                {times.map(time => (
                                  <Badge 
                                    key={time}
                                    variant="secondary"
                                    className="bg-red-100 text-red-700"
                                  >
                                    {time}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}

      {/* Booking Modal - Compact Professional Design */}
      {showBooking && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 z-50 modal-overlay animate-in fade-in duration-300">
          <Card className="w-full max-w-md sm:max-w-lg lg:max-w-xl bg-white/98 backdrop-blur-xl border-0 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] max-h-[95vh] overflow-y-auto animate-in zoom-in-95 duration-300 transform">
            {/* Compact Header with Gradient */}
            <div className="sticky top-0 relative bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 p-4 sm:p-6 rounded-t-2xl z-10">
              <div className="absolute inset-0 bg-black/10 rounded-t-2xl"></div>
              <div className="relative flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-xl sm:text-2xl font-bold text-white mb-1 drop-shadow-lg">
                    {pageTexts.bookingTitle}
                  </CardTitle>
                  <CardDescription className="text-orange-100 text-sm sm:text-base font-medium">
                    {pageTexts.bookingSubtitle}
                  </CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setShowBooking(false)}
                  className="rounded-full p-2 sm:p-3 hover:bg-white/20 hover:border-white/30 transition-all duration-300 border-2 border-white/30 ml-3 flex-shrink-0 backdrop-blur-sm"
                  title="Bezárás"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </Button>
              </div>
            </div>

            {/* Compact Content */}
            <CardContent className="p-4 sm:p-6 bg-gradient-to-b from-gray-50 to-white">
              <div className="space-y-4 sm:space-y-6">
                {/* Compact Selected Dog Info */}
                {bookingForm.dog_name && (
                  <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-yellow-50 border border-orange-200 rounded-xl p-3 sm:p-4 shadow-md">
                    <div className="flex items-center">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center mr-3 flex-shrink-0 shadow-md">
                        <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-semibold text-orange-700 mb-0.5">Kiválasztott kiskutya:</p>
                        <p className="text-sm sm:text-base font-bold text-orange-800 truncate">{bookingForm.dog_name}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Compact Form Fields - 2x2 Grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  <div className="col-span-2">
                    <label className="block text-xs sm:text-sm font-semibold mb-2 text-gray-700">Kívánt Dátum</label>
                    <input 
                      type="date" 
                      className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 text-sm sm:text-base bg-white shadow-sm hover:shadow-md"
                      min={new Date().toISOString().split('T')[0]}
                      value={bookingForm.preferred_date}
                      onChange={(e) => setBookingForm({...bookingForm, preferred_date: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold mb-2 text-gray-700">Kívánt Időpont</label>
                    <select 
                      className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 text-sm sm:text-base bg-white shadow-sm hover:shadow-md"
                      value={bookingForm.preferred_time}
                      onChange={(e) => setBookingForm({...bookingForm, preferred_time: e.target.value})}
                    >
                                                      {timeSlots.map(time => {
                        const isBooked = bookedSlots[bookingForm.preferred_date]?.includes(time);
                        return (
                          <option 
                            key={time} 
                            value={time}
                            disabled={isBooked}
                            className={isBooked ? 'text-red-500 bg-red-50' : ''}
                          >
                            {time} {isBooked ? '(Foglalt)' : ''}
                          </option>
                        );
                      })}
                    </select>
                    {bookingForm.preferred_date && bookedSlots[bookingForm.preferred_date]?.length > 0 && (
                      <div className="mt-2 p-2 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-xs text-red-700 font-medium">Foglalt időpontok ezen a napon:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {bookedSlots[bookingForm.preferred_date].map(time => (
                            <span key={time} className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                              {time}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-xs sm:text-sm font-semibold mb-2 text-gray-700">Az Ön Neve</label>
                    <input 
                      type="text" 
                      className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 text-sm sm:text-base bg-white shadow-sm hover:shadow-md"
                      placeholder="Adja meg a nevét"
                      value={bookingForm.name}
                      onChange={(e) => setBookingForm({...bookingForm, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-xs sm:text-sm font-semibold mb-2 text-gray-700">Telefonszám</label>
                    <input 
                      type="tel" 
                      className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 text-sm sm:text-base bg-white shadow-sm hover:shadow-md"
                      placeholder="Adja meg a telefonszámát"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingForm({...bookingForm, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-semibold mb-2 text-gray-700">Üzenet (Opcionális)</label>
                  <textarea 
                    className="w-full p-3 sm:p-4 border-2 border-gray-200 rounded-lg h-16 sm:h-20 focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all duration-300 resize-none text-sm sm:text-base bg-white shadow-sm hover:shadow-md"
                    placeholder="Bármilyen különleges kérés vagy kérdés?"
                    value={bookingForm.message}
                    onChange={(e) => setBookingForm({...bookingForm, message: e.target.value})}
                  />
                </div>

                {/* Compact Submit Button */}
                <Button 
                  className="w-full bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-600 hover:via-amber-600 hover:to-yellow-600 text-white shadow-[0_8px_20px_-5px_rgba(251,146,60,0.4)] hover:shadow-[0_15px_30px_-10px_rgba(251,146,60,0.6)] transform hover:scale-[1.02] transition-all duration-300 rounded-xl py-3 sm:py-4 text-base sm:text-lg font-bold border-0"
                  onClick={() => {
                    const formData = {
                      ...bookingForm,
                      dog_id: selectedDog?.id,
                      dog_name: selectedDog?.name
                    };
                    handleBookingSubmit(formData);
                  }}
                >
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
                  Időpont Megerősítése
                </Button>

                {/* Compact Info Text */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                  <p className="text-xs sm:text-sm text-blue-700 font-medium">
                    24 órán belül felvesszük Önnel a kapcsolatot az időpont megerősítéséhez
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Új Kutya Hozzáadása Modal */}
      {showAddDog && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 modal-overlay animate-in fade-in duration-300">
          <Card className="w-full max-w-4xl max-h-[90vh] bg-white/98 backdrop-blur-xl border-0 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-6">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl font-bold text-white">Új Kutya Hozzáadása</CardTitle>
                  <CardDescription className="text-green-100">Adja meg az új kutya adatait</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddDog(false)}
                  className="border-white/30 text-white hover:bg-white/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bal oldal - Alapadatok */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Név</label>
                    <input 
                      type="text"
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300"
                      placeholder="Kutya neve"
                      value={newDogForm.name}
                      onChange={(e) => setNewDogForm({...newDogForm, name: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Fajta</label>
                    <input 
                      type="text"
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300"
                      placeholder="pl. Maltipoo"
                      value={newDogForm.breed}
                      onChange={(e) => setNewDogForm({...newDogForm, breed: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Életkor</label>
                      <input 
                        type="text"
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300"
                        placeholder="pl. 9 hetes"
                        value={newDogForm.age}
                        onChange={(e) => setNewDogForm({...newDogForm, age: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Ár</label>
                      <input 
                        type="text"
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300"
                        placeholder="pl. 350.000 Ft"
                        value={newDogForm.price}
                        onChange={(e) => setNewDogForm({...newDogForm, price: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Nem</label>
                      <select 
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300"
                        value={newDogForm.gender}
                        onChange={(e) => setNewDogForm({...newDogForm, gender: e.target.value})}
                      >
                        <option value="Fiú">Fiú</option>
                        <option value="Szuka">Szuka</option>
                        <option value="Kan">Kan</option>
                        <option value="Vegyes">Vegyes</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Súly</label>
                      <input 
                        type="text"
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300"
                        placeholder="pl. 2.5 kg"
                        value={newDogForm.weight}
                        onChange={(e) => setNewDogForm({...newDogForm, weight: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Szülők</label>
                    <input 
                      type="text"
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300"
                      placeholder="pl. Máltai selyemkutya anya × Toy uszkár apa"
                      value={newDogForm.parents}
                      onChange={(e) => setNewDogForm({...newDogForm, parents: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Temperamentum</label>
                    <input 
                      type="text"
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300"
                      placeholder="pl. Játékos, szeretetteljes, intelligens"
                      value={newDogForm.temperament}
                      onChange={(e) => setNewDogForm({...newDogForm, temperament: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Kategória</label>
                    <select 
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300"
                      value={newDogForm.category}
                      onChange={(e) => setNewDogForm({...newDogForm, category: e.target.value})}
                    >
                      <option value="maltipoo">Maltipoo</option>
                      <option value="cavapoo">Cavapoo</option>
                      <option value="special">Különleges</option>
                    </select>
                  </div>

                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2">
                      <input 
                        type="checkbox"
                        checked={newDogForm.vaccinated}
                        onChange={(e) => setNewDogForm({...newDogForm, vaccinated: e.target.checked})}
                        className="w-4 h-4 text-green-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Oltott</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input 
                        type="checkbox"
                        checked={newDogForm.microchipped}
                        onChange={(e) => setNewDogForm({...newDogForm, microchipped: e.target.checked})}
                        className="w-4 h-4 text-green-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Chipelt</span>
                    </label>
                  </div>
                </div>

                {/* Jobb oldal - Kép és leírás */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Kép</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-green-500 transition-colors">
                      <input 
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, (url) => setNewDogForm({...newDogForm, image: url}))}
                        className="hidden"
                        id="new-dog-image"
                      />
                      <label htmlFor="new-dog-image" className="cursor-pointer">
                        <div className="w-32 h-32 mx-auto mb-2 bg-gray-100 rounded-lg flex items-center justify-center">
                          {newDogForm.image ? (
                            <img src={newDogForm.image} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                          ) : (
                            <Plus className="w-8 h-8 text-gray-400" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600">Kattintson a kép feltöltéséhez</p>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Leírás</label>
                    <textarea 
                      className="w-full p-3 border-2 border-gray-200 rounded-lg h-32 focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300 resize-none"
                      placeholder="Részletes leírás a kutyáról..."
                      value={newDogForm.description}
                      onChange={(e) => setNewDogForm({...newDogForm, description: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Különleges jellemzők (vesszővel elválasztva)</label>
                    <input 
                      type="text"
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all duration-300"
                      placeholder="pl. Hipoallergén szőrzet, Könnyen tanítható, Gyerekbarát"
                      value={newDogForm.specialFeatures.join(', ')}
                      onChange={(e) => setNewDogForm({...newDogForm, specialFeatures: e.target.value.split(',').map(s => s.trim()).filter(s => s)})}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-gray-200">
                <Button 
                  variant="outline"
                  onClick={() => setShowAddDog(false)}
                  className="border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  Mégse
                </Button>
                <Button 
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  onClick={() => {
                    if (newDogForm.name && newDogForm.breed && newDogForm.price) {
                      handleAddDog(newDogForm);
                      setNewDogForm({
                        name: '',
                        breed: '',
                        age: '',
                        price: '',
                        image: dog1,
                        description: '',
                        gender: 'Fiú',
                        vaccinated: true,
                        microchipped: true,
                        weight: '',
                        parents: '',
                        temperament: '',
                        specialFeatures: [],
                        category: 'maltipoo'
                      });
                    } else {
                      alert('Kérjük töltse ki a kötelező mezőket!');
                    }
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Kutya Hozzáadása
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Szöveg Szerkesztő Modal */}
      {showTextEditor && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 modal-overlay animate-in fade-in duration-300">
          <Card className="w-full max-w-2xl bg-white/98 backdrop-blur-xl border-0 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] animate-in zoom-in-95 duration-300">
            <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-6">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl font-bold text-white">Szöveg Szerkesztése</CardTitle>
                  <CardDescription className="text-purple-100">Módosítsa a kiválasztott szöveget</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setShowTextEditor(false)}
                  className="border-white/30 text-white hover:bg-white/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700">Szöveg</label>
                  <textarea 
                    className="w-full p-4 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 h-32 resize-none"
                    placeholder="Írja be a szöveget..."
                    value={editingText}
                    onChange={(e) => setEditingText(e.target.value)}
                  />
                </div>
                <div className="flex justify-end space-x-4">
                  <Button 
                    variant="outline"
                    onClick={() => setShowTextEditor(false)}
                    className="border-gray-300 text-gray-600 hover:bg-gray-50"
                  >
                    Mégse
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                    onClick={handleSaveText}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Mentés
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Kutya Szerkesztése Modal */}
      {showEditDog && editingDog && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 modal-overlay animate-in fade-in duration-300">
          <Card className="w-full max-w-4xl max-h-[90vh] bg-white/98 backdrop-blur-xl border-0 rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6">
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-2xl font-bold text-white">Kutya Szerkesztése</CardTitle>
                  <CardDescription className="text-blue-100">Módosítsa a kutya adatait</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowEditDog(false);
                    setEditingDog(null);
                  }}
                  className="border-white/30 text-white hover:bg-white/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bal oldal - Alapadatok */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Név</label>
                    <input 
                      type="text"
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                      placeholder="Kutya neve"
                      value={editDogForm.name}
                      onChange={(e) => setEditDogForm({...editDogForm, name: e.target.value})}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Fajta</label>
                    <input 
                      type="text"
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                      placeholder="pl. Maltipoo"
                      value={editDogForm.breed}
                      onChange={(e) => setEditDogForm({...editDogForm, breed: e.target.value})}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Életkor</label>
                      <input 
                        type="text"
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                        placeholder="pl. 9 hetes"
                        value={editDogForm.age}
                        onChange={(e) => setEditDogForm({...editDogForm, age: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Ár</label>
                      <input 
                        type="text"
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                        placeholder="pl. 350.000 Ft"
                        value={editDogForm.price}
                        onChange={(e) => setEditDogForm({...editDogForm, price: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Nem</label>
                      <select 
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                        value={editDogForm.gender}
                        onChange={(e) => setEditDogForm({...editDogForm, gender: e.target.value})}
                      >
                        <option value="Fiú">Fiú</option>
                        <option value="Szuka">Szuka</option>
                        <option value="Kan">Kan</option>
                        <option value="Vegyes">Vegyes</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2 text-gray-700">Súly</label>
                      <input 
                        type="text"
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                        placeholder="pl. 2.5 kg"
                        value={editDogForm.weight}
                        onChange={(e) => setEditDogForm({...editDogForm, weight: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Szülők</label>
                    <input 
                      type="text"
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                      placeholder="pl. Máltai selyemkutya anya × Toy uszkár apa"
                      value={editDogForm.parents}
                      onChange={(e) => setEditDogForm({...editDogForm, parents: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Temperamentum</label>
                    <input 
                      type="text"
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                      placeholder="pl. Játékos, szeretetteljes, intelligens"
                      value={editDogForm.temperament}
                      onChange={(e) => setEditDogForm({...editDogForm, temperament: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Kategória</label>
                    <select 
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                      value={editDogForm.category}
                      onChange={(e) => setEditDogForm({...editDogForm, category: e.target.value})}
                    >
                      <option value="maltipoo">Maltipoo</option>
                      <option value="cavapoo">Cavapoo</option>
                      <option value="special">Különleges</option>
                    </select>
                  </div>

                  <div className="flex space-x-4">
                    <label className="flex items-center space-x-2">
                      <input 
                        type="checkbox"
                        checked={editDogForm.vaccinated}
                        onChange={(e) => setEditDogForm({...editDogForm, vaccinated: e.target.checked})}
                        className="w-4 h-4 text-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Oltott</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input 
                        type="checkbox"
                        checked={editDogForm.microchipped}
                        onChange={(e) => setEditDogForm({...editDogForm, microchipped: e.target.checked})}
                        className="w-4 h-4 text-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Chipelt</span>
                    </label>
                  </div>
                </div>

                {/* Jobb oldal - Kép és leírás */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Kép</label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors">
                      <input 
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e, (url) => setEditDogForm({...editDogForm, image: url}))}
                        className="hidden"
                        id="edit-dog-image"
                      />
                      <label htmlFor="edit-dog-image" className="cursor-pointer">
                        <div className="w-32 h-32 mx-auto mb-2 bg-gray-100 rounded-lg flex items-center justify-center">
                          {editDogForm.image ? (
                            <img src={editDogForm.image} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                          ) : (
                            <Plus className="w-8 h-8 text-gray-400" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600">Kattintson a kép feltöltéséhez</p>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Leírás</label>
                    <textarea 
                      className="w-full p-3 border-2 border-gray-200 rounded-lg h-32 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 resize-none"
                      placeholder="Részletes leírás a kutyáról..."
                      value={editDogForm.description}
                      onChange={(e) => setEditDogForm({...editDogForm, description: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700">Különleges jellemzők (vesszővel elválasztva)</label>
                    <input 
                      type="text"
                      className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300"
                      placeholder="pl. Hipoallergén szőrzet, Könnyen tanítható, Gyerekbarát"
                      value={editDogForm.specialFeatures.join(', ')}
                      onChange={(e) => setEditDogForm({...editDogForm, specialFeatures: e.target.value.split(',').map(s => s.trim()).filter(s => s)})}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-gray-200">
                <Button 
                  variant="outline"
                  onClick={() => {
                    setShowEditDog(false);
                    setEditingDog(null);
                  }}
                  className="border-gray-300 text-gray-600 hover:bg-gray-50"
                >
                  Mégse
                </Button>
                <Button 
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  onClick={() => {
                    if (editDogForm.name && editDogForm.breed && editDogForm.price) {
                      handleEditDog({...editDogForm, id: editingDog.id});
                    } else {
                      alert('Kérjük töltse ki a kötelező mezőket!');
                    }
                  }}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Módosítások Mentése
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      <style jsx>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  )
}

export default App


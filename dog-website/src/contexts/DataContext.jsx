import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [availablePuppies, setAvailablePuppies] = useState([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedGalleryImages = localStorage.getItem('hibridshop_gallery_images');
    const savedBookings = localStorage.getItem('hibridshop_bookings');
    const savedBreeds = localStorage.getItem('hibridshop_breeds');
    const savedPuppies = localStorage.getItem('hibridshop_puppies');

    if (savedGalleryImages) {
      setGalleryImages(JSON.parse(savedGalleryImages));
    }
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
    if (savedBreeds) {
      setBreeds(JSON.parse(savedBreeds));
    }
    if (savedPuppies) {
      setAvailablePuppies(JSON.parse(savedPuppies));
    }
  }, []);

  // Save data to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('hibridshop_gallery_images', JSON.stringify(galleryImages));
  }, [galleryImages]);

  useEffect(() => {
    localStorage.setItem('hibridshop_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('hibridshop_breeds', JSON.stringify(breeds));
  }, [breeds]);

  useEffect(() => {
    localStorage.setItem('hibridshop_puppies', JSON.stringify(availablePuppies));
  }, [availablePuppies]);

  // Add new booking
  const addBooking = (booking) => {
    const newBooking = {
      id: Date.now(),
      ...booking,
      status: 'pending',
      created_at: new Date().toISOString()
    };
    setBookings(prev => [...prev, newBooking]);
    return newBooking;
  };

  const value = {
    galleryImages,
    setGalleryImages,
    bookings,
    setBookings,
    addBooking,
    breeds,
    setBreeds,
    availablePuppies,
    setAvailablePuppies
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
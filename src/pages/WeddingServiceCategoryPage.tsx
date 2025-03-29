
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Hero from '@/components/Hero';
import BackButton from '@/components/BackButton';
import EventCard from '@/components/EventCard';

// Wedding service subcategories data
const weddingServiceData = {
  stage: {
    title: "Stage Decoration",
    subtitle: "Beautiful stage setups for wedding ceremonies and receptions",
    hero: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
    items: [
      {
        id: '101',
        name: 'Elegant Stage Decoration',
        description: 'Beautiful stage setup with floral arrangements, fabric draping, and elegant lighting.',
        price: 85000,
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
        category: 'wedding',
        subcategory: 'stage-decoration',
        path: '/events/wedding/details/101'
      },
      {
        id: '107',
        name: 'Royal Stage Setup',
        description: 'Luxurious stage decoration with royal theme, golden accents, and premium flowers.',
        price: 120000,
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
        category: 'wedding',
        subcategory: 'stage-royal',
        path: '/events/wedding/details/107'
      },
      {
        id: '108',
        name: 'Minimalist Stage Design',
        description: 'Clean and elegant stage setup with minimalist design elements and subtle lighting.',
        price: 65000,
        image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
        category: 'wedding',
        subcategory: 'stage-minimalist',
        path: '/events/wedding/details/108'
      }
    ]
  },
  mandap: {
    title: "Mandap Decoration",
    subtitle: "Traditional mandap setups with beautiful decorations for the wedding ceremony",
    hero: "https://images.unsplash.com/photo-1620162009840-7a61c6274bf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80",
    items: [
      {
        id: '104',
        name: 'Traditional Mandap Setup',
        description: 'Complete mandap setup with traditional elements and beautiful decorations for the wedding ceremony.',
        price: 70000,
        image: 'https://images.unsplash.com/photo-1620162009840-7a61c6274bf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80',
        category: 'wedding',
        subcategory: 'mandap-decoration',
        path: '/events/wedding/details/104'
      },
      {
        id: '109',
        name: 'Contemporary Mandap Design',
        description: 'Modern mandap setup with contemporary design elements while maintaining traditional essence.',
        price: 85000,
        image: 'https://images.unsplash.com/photo-1620162009840-7a61c6274bf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1771&q=80',
        category: 'wedding',
        subcategory: 'mandap-contemporary',
        path: '/events/wedding/details/109'
      }
    ]
  },
  gate: {
    title: "Gate Decoration",
    subtitle: "Grand entrance gates decorated with flowers, lights and fabric to welcome your guests",
    hero: "https://images.unsplash.com/photo-1519741347686-c1e331ec5a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
    items: [
      {
        id: '102',
        name: 'Royal Gate Decoration',
        description: 'Grand entrance gate decorated with flowers, lights and fabric to welcome your guests.',
        price: 35000,
        image: 'https://images.unsplash.com/photo-1519741347686-c1e331ec5a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
        category: 'wedding',
        subcategory: 'gate-decoration',
        path: '/events/wedding/details/102'
      },
      {
        id: '110',
        name: 'Floral Arch Entrance',
        description: 'Beautiful arch entrance decorated with fresh flowers and subtle lighting.',
        price: 28000,
        image: 'https://images.unsplash.com/photo-1519741347686-c1e331ec5a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80',
        category: 'wedding',
        subcategory: 'gate-arch',
        path: '/events/wedding/details/110'
      }
    ]
  },
  gallery: {
    title: "Gallery Walkway Decoration",
    subtitle: "Beautifully decorated pathways with flowers, candles, and photo frames displaying your memories",
    hero: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80",
    items: [
      {
        id: '103',
        name: 'Gallery Walkway Decoration',
        description: 'Beautifully decorated pathways with flowers, candles, and photo frames displaying your memories.',
        price: 45000,
        image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80',
        category: 'wedding',
        subcategory: 'gallery-decoration',
        path: '/events/wedding/details/103'
      },
      {
        id: '111',
        name: 'Memory Lane Setup',
        description: 'Elegant pathway decorated with your cherished photos and memories with premium lighting.',
        price: 55000,
        image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80',
        category: 'wedding',
        subcategory: 'gallery-memory',
        path: '/events/wedding/details/111'
      }
    ]
  },
  reception: {
    title: "Reception Decoration",
    subtitle: "Elegant decoration for wedding receptions with beautiful table settings and ambient lighting",
    hero: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    items: [
      {
        id: '106',
        name: 'Wedding Reception Decor',
        description: 'Elegant decoration for wedding reception with beautiful table settings, backdrop, and ambient lighting.',
        price: 65000,
        image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        category: 'wedding',
        subcategory: 'reception-decoration',
        path: '/events/wedding/details/106'
      },
      {
        id: '112',
        name: 'Premium Reception Setup',
        description: 'Luxurious reception decoration with premium floral arrangements and sophisticated lighting.',
        price: 90000,
        image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        category: 'wedding',
        subcategory: 'reception-premium',
        path: '/events/wedding/details/112'
      }
    ]
  },
  complete: {
    title: "Complete Wedding Packages",
    subtitle: "Comprehensive wedding decoration package including all services for a hassle-free experience",
    hero: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    items: [
      {
        id: '105',
        name: 'Complete Wedding Package',
        description: 'Comprehensive wedding decoration package including stage, gate, gallery, mandap, and seating arrangements.',
        price: 200000,
        image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        category: 'wedding',
        subcategory: 'complete-package',
        path: '/events/wedding/details/105'
      },
      {
        id: '113',
        name: 'Premium Wedding Package',
        description: 'Luxurious wedding decoration package with premium materials and personalized design.',
        price: 300000,
        image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
        category: 'wedding',
        subcategory: 'complete-premium',
        path: '/events/wedding/details/113'
      }
    ]
  }
};

const WeddingServiceCategoryPage = () => {
  const { serviceType } = useParams<{ serviceType: string }>();
  
  if (!serviceType || !weddingServiceData[serviceType as keyof typeof weddingServiceData]) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-3xl font-serif font-bold mb-4">Service Not Found</h1>
        <p className="mb-8">The wedding service you're looking for doesn't exist.</p>
        <Link to="/wedding" className="btn-primary">Return to Wedding Services</Link>
      </div>
    );
  }
  
  const data = weddingServiceData[serviceType as keyof typeof weddingServiceData];
  
  return (
    <div>
      <Hero 
        title={data.title}
        subtitle={data.subtitle}
        image={data.hero}
        buttonText="Contact Us"
        buttonLink="/contact"
      />
      
      <div className="container-custom py-12">
        <BackButton className="mb-8" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.items.map((item) => (
            <EventCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeddingServiceCategoryPage;

'use client';

import { useState } from 'react';
import { Award, Users, Target, Heart, Shield, Zap, Globe, Star } from 'lucide-react';

const teamMembers = [
  {
    name: "Alex Chen",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
    bio: "Tech entrepreneur with 10+ years in e-commerce and consumer electronics."
  },
  {
    name: "Sarah Johnson", 
    role: "Head of Product",
    image: "https://images.unsplash.com/photo-1494790108755-2616b25c1c77?w=300",
    bio: "Product specialist focused on curating the best tech accessories."
  },
  {
    name: "Mike Rodriguez",
    role: "Tech Lead", 
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300",
    bio: "Full-stack developer ensuring the best shopping experience."
  },
  {
    name: "Emma Wilson",
    role: "Customer Success",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300", 
    bio: "Dedicated to ensuring amazing customer experiences."
  }
];

const achievements = [
  { icon: Users, number: "50K+", label: "Happy Customers", color: "text-blue-600" },
  { icon: Star, number: "4.8", label: "Average Rating", color: "text-yellow-500" },
  { icon: Globe, number: "500+", label: "Cities Served", color: "text-green-600" },
  { icon: Award, number: "99%", label: "Success Rate", color: "text-purple-600" }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white py-20">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-lg rounded-full px-6 py-2 mb-6">
              <Heart className="w-5 h-5 text-red-300" />
              <span className="font-medium">Our Story</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-yellow-200 bg-clip-text text-transparent">
              About
              <span className="block text-yellow-300">TechNova</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Revolutionizing the future of technology with cutting-edge gadgets since 2020
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold text-gray-900">Our Journey</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              TechNova emerged from a vision to democratize access to cutting-edge technology. We believe that 
              everyone deserves to experience the future today, regardless of their location or budget. Our mission 
              is to curate the most innovative gadgets and accessories from around the globe.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              From our humble beginnings in 2020, we've evolved into India's most trusted tech destination, 
              serving over 100,000+ satisfied customers across 750+ cities. We partner with visionary brands 
              and emerging innovators to bring you tomorrow's technology today.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600"
              alt="Our Journey"
              className="rounded-3xl shadow-2xl w-full h-96 object-cover"
            />
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {achievements.map((achievement) => (
            <div key={achievement.label} className="text-center bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <achievement.icon className={`w-12 h-12 ${achievement.color} mx-auto mb-4`} />
              <div className="text-3xl font-bold text-gray-900 mb-2">{achievement.number}</div>
              <div className="text-gray-600">{achievement.label}</div>
            </div>
          ))}
        </div>

        {/* Team Section */}
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Passionate individuals working together to bring you the best tech shopping experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member) => (
              <div key={member.name} className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-blue-100">The principles that guide everything we do</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Customer First</h3>
              <p className="text-blue-100">Everything centered around exceptional customer value</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Assurance</h3>
              <p className="text-blue-100">Highest standards of quality and reliability</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-blue-100">Latest technology trends and cutting-edge products</p>
            </div>
            
            <div className="text-center group">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
                <Globe className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-2">Accessibility</h3>
              <p className="text-blue-100">Premium tech accessible and affordable for everyone</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
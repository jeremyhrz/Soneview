import React from 'react';
import { motion } from 'framer-motion';
import {
  LayoutGrid, Tv, Laptop, Refrigerator,
  Wind, ChefHat, Snowflake, Speaker,
  WashingMachine, Zap,
} from 'lucide-react';
import { categories } from '../data/mockData';

/**
 * CategorySelector.jsx
 * Horizontal scrollable category bar with icon + label pills.
 * Highlights the active category and calls onSelect on click.
 */

const iconMap = {
  LayoutGrid,
  Tv,
  Laptop,
  Refrigerator,
  Wind,
  ChefHat,
  Snowflake,
  Speaker,
  WashingMachine,
  Zap,
};

const CategorySelector = ({ active = 'all', onSelect }) => {
  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <motion.div
        className="flex items-center gap-2 px-4 py-4 w-max mx-auto sm:w-auto sm:justify-center sm:flex-wrap"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {categories.map((cat, i) => {
          const Icon = iconMap[cat.icon] || Zap;
          const isActive = cat.id === active;

          return (
            <motion.button
              key={cat.id}
              id={`cat-${cat.id}`}
              onClick={() => onSelect?.(cat.id)}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileTap={{ scale: 0.94 }}
              className={`cat-pill ${isActive ? 'active' : ''}`}
              aria-pressed={isActive}
              aria-label={`Categoría: ${cat.name}`}
            >
              <span
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  isActive
                    ? 'bg-sv-cream/20'
                    : 'bg-sv-blue/5 group-hover:bg-sv-blue/10'
                }`}
              >
                <Icon
                  size={20}
                  strokeWidth={1.6}
                  className={isActive ? 'text-sv-cream' : 'text-sv-blue/60'}
                />
              </span>
              <span className="text-[11px] leading-tight whitespace-nowrap">
                {cat.label}
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};

export default CategorySelector;

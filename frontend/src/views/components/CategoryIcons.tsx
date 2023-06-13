import React from 'react';

import RestaurantIcon from '@mui/icons-material/Restaurant';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import DirectionsTransitIcon from '@mui/icons-material/DirectionsTransit';
import HouseIcon from '@mui/icons-material/House';
import LightIcon from '@mui/icons-material/Light';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import Face3Icon from '@mui/icons-material/Face3';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import { CategoryIcon } from '../../types';

export const CategoryIcons = () => {
  const categoryIcons: CategoryIcon[] = [
    { id: 1, category: 'None', icon: <HorizontalRuleIcon /> },
    { id: 2, category: 'Food', icon: <RestaurantIcon /> },
    { id: 3, category: 'Entertainment', icon: <MusicNoteIcon /> },
    { id: 4, category: 'Transportation', icon: <DirectionsTransitIcon /> },
    { id: 5, category: 'Cost of Living', icon: <HouseIcon /> },
    { id: 6, category: 'Utility', icon: <LightIcon /> },
    { id: 7, category: 'Health', icon: <MonitorHeartIcon /> },
    { id: 8, category: 'Beauty', icon: <Face3Icon /> },
    { id: 9, category: 'Cloth', icon: <ShoppingCartIcon /> },
    { id: 10, category: 'Others', icon: <HelpOutlineIcon /> },
  ];

  return <div>CategoryIcons</div>;
};

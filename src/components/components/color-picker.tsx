import { motion } from 'framer-motion';
import { Palette } from 'lucide-react';

export type ColorTheme = 'blue' | 'orange' | 'green' | 'red' | 'purple' | 'gold';

interface ColorPickerProps {
  selectedColor: ColorTheme;
  onColorChange: (color: ColorTheme) => void;
}

const colors: { name: ColorTheme; bg: string; label: string }[] = [
  { name: 'blue', bg: 'bg-blue-500', label: 'Blau' },
  { name: 'orange', bg: 'bg-orange-500', label: 'Orange' },
  { name: 'green', bg: 'bg-green-500', label: 'Grün' },
  { name: 'red', bg: 'bg-red-500', label: 'Rot' },
  { name: 'purple', bg: 'bg-purple-500', label: 'Lila' },
  { name: 'gold', bg: 'bg-yellow-500', label: 'Gold' },
];

export function ColorPicker({ selectedColor, onColorChange }: ColorPickerProps) {
  return (
    <div className="fixed top-8 right-8 z-50">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20 shadow-lg"
      >
        <div className="flex items-center gap-2 mb-3">
          <Palette className="w-4 h-4 text-white/70" />
          <span className="text-sm text-white/70">Farbthema</span>
        </div>
        
        <div className="flex gap-2">
          {colors.map((color) => (
            <motion.button
              key={color.name}
              onClick={() => onColorChange(color.name)}
              className={`w-10 h-10 rounded-full ${color.bg} relative transition-all duration-300 hover:scale-110`}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              title={color.label}
            >
              {selectedColor === color.name && (
                <motion.div
                  layoutId="selected-color"
                  className="absolute inset-0 border-2 border-white rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              {selectedColor === color.name && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute inset-0 rounded-full bg-white/20"
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

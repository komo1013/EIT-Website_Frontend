import { ColorTheme } from './profile-card';

interface ColorPickerProps {
  selectedColor: ColorTheme;
  onColorChange: (color: ColorTheme) => void;
}

export function ColorPicker({ selectedColor, onColorChange }: ColorPickerProps) {
  const colors: ColorTheme[] = ['blue', 'green', 'orange', 'purple', 'red', 'gold'];
  
  const colorClasses: Record<ColorTheme, string> = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    purple: 'bg-purple-500',
    red: 'bg-red-500',
    gold: 'bg-yellow-500',
  };

  return (
    <div className="fixed top-8 right-8 z-50 flex gap-2 bg-white/10 backdrop-blur-sm p-3 rounded-full border border-white/20">
      {colors.map((color) => (
        <button
          key={color}
          onClick={() => onColorChange(color)}
          className={`w-8 h-8 rounded-full transition-transform hover:scale-110 ${colorClasses[color]} ${
            selectedColor === color ? 'ring-2 ring-white scale-110' : ''
          }`}
          aria-label={`Select ${color} theme`}
        />
      ))}
    </div>
  );
}

import React from 'react';
import {
  Zap,
  Utensils,
  ShoppingBag,
  TrendingUp,
  Plane,
  Film,
  Layers
} from 'lucide-react';

const ICON_MAP = {
  "Zap": Zap,
  "Utensils": Utensils,
  "ShoppingBag": ShoppingBag,
  "TrendingUp": TrendingUp,
  "Plane": Plane,
  "Film": Film,
  "Layers": Layers
};

export default function CategoryBreakdown({ categories, formatINR }) {
  const total = categories.reduce((sum, c) => sum + c.amount, 0);

  return (
    <div className="w-full space-y-4">
      {/* Category List */}
      <div className="space-y-3">
        {categories.map(cat => {
          const IconComp = ICON_MAP[cat.icon] || Layers;
          return (
            <div key={cat.name} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div
                    className="h-6 w-6 rounded-md flex items-center justify-center text-slate-200"
                    style={{ backgroundColor: `${cat.color}20` }}
                  >
                    <IconComp className="w-3.5 h-3.5" style={{ color: cat.color }} />
                  </div>
                  <span className="font-medium text-slate-200">{cat.name}</span>
                </div>
                <div className="text-right font-mono">
                  <span className="text-slate-100 font-bold">{formatINR(cat.amount)}</span>
                  <span className="text-[10px] text-slate-400 ml-1.5 font-semibold">({cat.percentage}%)</span>
                </div>
              </div>
              <div className="h-1.5 w-full bg-[#1A2332] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${cat.percentage}%`, backgroundColor: cat.color }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

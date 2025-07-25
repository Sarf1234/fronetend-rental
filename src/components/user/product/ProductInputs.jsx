'use client';
import { Input } from '@/components/ui/input';
import { useEffect } from 'react';

export default function ProductInputs({ pricingType, formData, setFormData, unitinfo }) {
  const update = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: Number(value) }));
  };

  useEffect(() => {
    if (pricingType === 'quantity') {
      setFormData((prev) => ({ ...prev, length: 1, width: 1 }));
    }
  }, [pricingType]);

  return (
    <div className="space-y-4 mt-4">
      <div>
        <label className="block text-sm font-medium">Days</label>
        <Input
          type="number"
          min={1}
          value={formData.days}
          onChange={(e) => update('days', e.target.value)}
          className="input"
        />
      </div>

      {/* ✅ Always show quantity */}
      <div>
        <label className="block text-sm font-medium">
          Quantity (pcs)
        </label>
        <Input
          type="number"
          min={1}
          value={formData.quantity}
          onChange={(e) => update('quantity', e.target.value)}
          className="input"
        />
      </div>

      {['length_width', 'area'].includes(pricingType) && (
        <div>
          <label className="block text-sm font-medium">
            Length ({unitinfo})
          </label>
          <Input
            type="number"
            min={1}
            value={formData.length}
            onChange={(e) => update('length', e.target.value)}
            className="input"
          />
        </div>
      )}

      {pricingType === 'area' && (
        <div>
          <label className="block text-sm font-medium">
            Width ({unitinfo})
          </label>
          <Input
            type="number"
            min={1}
            value={formData.width}
            onChange={(e) => update('width', e.target.value)}
            className="input"
          />
        </div>
      )}
    </div>
  );
}

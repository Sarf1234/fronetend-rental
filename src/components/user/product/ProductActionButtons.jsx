// components/product/ProductActionButtons.jsx
'use client';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { addOrUpdateCartItem } from '@/services/cartService';
import { Button } from '@/components/ui/button';
import { FileText, ShoppingCart, Package } from 'lucide-react';

export default function ProductActionButtons({ product, formData }) {
  const { user } = useAuth();
  const router = useRouter();

  const handleAddToCart = async () => {
    if (!user) return router.push('/auth/login');

    try {
      const payload = {
        productId: product._id,
        pricingType: product.pricingType,
        days: formData.days,
        withService: formData.withService,
      };

      if (product.pricingType === 'quantity') {
        payload.quantity = formData.quantity;
      } else if (product.pricingType === 'length_width') {
        payload.length = formData.length;
      } else if (product.pricingType === 'area') {
        payload.length = formData.length;
        payload.width = formData.width;
      }

      await addOrUpdateCartItem(payload);
      toast.success('Added to cart');
    } catch {
      toast.error('Failed to add to cart');
    }
  };

  return (
    <div className="grid grid-cols-3 gap-2 mt-4">
      <Button
        className="py-6 bg-[#003459] text-white flex items-center justify-center gap-2"
        onClick={() => toast.info('Quote feature coming soon')}
      >
        <FileText size={18} />
        Quote
      </Button>
      <Button
        className="py-6 bg-[#003459] text-white flex items-center justify-center gap-2"
        onClick={handleAddToCart}
      >
        <ShoppingCart size={18} />
        Cart
      </Button>
      <Button
        className="py-6 bg-[#003459] text-white flex items-center justify-center gap-2"
        onClick={() => toast.info('Rental coming soon')}
      >
        <Package size={18} />
        Rent
      </Button>
    </div>
  );
}

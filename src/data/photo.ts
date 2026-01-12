
// 1. 定義介面 (Interface) - 相片的「規格書」
export interface Photo {
  id: string;
  url: string;
  title: string;
  category: string;
}

// 2. 建立假資料 ( Mock Data )
export const photos: Photo[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    title: 'Camera Lens',
    category: 'Equipment'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=80',
    title: 'Photography Studio',
    category: 'Studio'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?auto=format&fit=crop&w=1000&q=80',
    title: 'Film Rolls',
    category: 'Equipment'
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1500634245200-e5245c7574ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    title: 'Nature Shot',
    category: 'Nature'
  },
   {
    id: '5',
    url: 'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    title: 'Old Camera',
    category: 'Vintage'
  },
   {
    id: '6',
    url: 'https://images.unsplash.com/photo-1552168324-d612d77725e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    title: 'Modern Workspace',
    category: 'Work'
  }
];
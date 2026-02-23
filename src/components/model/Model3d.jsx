import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Use dynamic import with SSR disabled for Three.js components
const ModelViewer = dynamic(() => import('./ModelViewer'), { ssr: false });

export default function Model3d() {
	return (
		<Suspense fallback={<div className="w-full h-screen flex items-center justify-center">Loading 3D Model...</div>}>
			<ModelViewer />
		</Suspense>
	)
}


"use client";
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import {
	useGLTF,
	CubeCamera,
	Environment,
	Center,
	useTexture
} from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { RGBELoader } from 'three-stdlib';

// Replace with your model path
const MODEL_PATH = '/model/scene.gltf';
// Replace with your texture path 
const TEXTURE_PATH = '/model/textures/Iridescent_baseColor.png';
// Environment map
const ENVMAP_PATH = 'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr';

// Custom hook for smooth drag rotation with inertia
function useDragRotation(ref) {
	const { gl } = useThree();
	const [isDragging, setIsDragging] = useState(false);
	const [previousMousePosition, setPreviousMousePosition] = useState({ x: 0, y: 0 });
	const velocityRef = useRef({ x: 0, y: 0 });
	const lastTimeRef = useRef(Date.now());

	// Configuration for smooth rotation
	const rotationSpeed = 0.005; // Base rotation speed (reduced for smoother feel)
	const dampingFactor = 0.92; // How quickly rotation slows down when not dragging
	const minVelocityThreshold = 0.001; // Velocity below this will stop the rotation

	// Handle continuous animation frames for smooth inertia
	useFrame(() => {
		if (!ref.current) return;

		const currentTime = Date.now();
		const deltaTime = Math.min((currentTime - lastTimeRef.current) / 16, 2); // Normalize to ~60fps
		lastTimeRef.current = currentTime;

		if (!isDragging) {
			// Apply damping when not dragging (inertia effect)
			velocityRef.current.x *= dampingFactor;
			velocityRef.current.y *= dampingFactor;

			// Stop very small movements to prevent endless tiny rotations
			if (Math.abs(velocityRef.current.x) < minVelocityThreshold) velocityRef.current.x = 0;
			if (Math.abs(velocityRef.current.y) < minVelocityThreshold) velocityRef.current.y = 0;
		}

		// Apply rotation based on current velocity
		ref.current.rotation.y += velocityRef.current.x * deltaTime;
		ref.current.rotation.x += velocityRef.current.y * deltaTime;

		// Constrain x-axis rotation to avoid flipping
		ref.current.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, ref.current.rotation.x));
	});

	useEffect(() => {
		const canvas = gl.domElement;

		const handleMouseDown = (e) => {
			setIsDragging(true);
			setPreviousMousePosition({
				x: e.clientX,
				y: e.clientY
			});
			// Reset velocity when starting a new drag
			velocityRef.current = { x: 0, y: 0 };
		};

		const handleMouseMove = (e) => {
			if (!isDragging || !ref.current) return;

			const deltaMove = {
				x: e.clientX - previousMousePosition.x,
				y: e.clientY - previousMousePosition.y
			};

			// Calculate new velocity based on mouse movement
			velocityRef.current = {
				x: deltaMove.x * rotationSpeed,
				y: deltaMove.y * rotationSpeed
			};

			// Apply immediate rotation during drag
			ref.current.rotation.y += velocityRef.current.x;
			ref.current.rotation.x += velocityRef.current.y;

			// Store this position for next frame
			setPreviousMousePosition({
				x: e.clientX,
				y: e.clientY
			});
		};

		const handleMouseUp = () => {
			setIsDragging(false);
			// Keep the current velocity for inertia when releasing
		};

		// Add event listeners for mouse
		canvas.addEventListener('mousedown', handleMouseDown);
		canvas.addEventListener('mousemove', handleMouseMove);
		canvas.addEventListener('mouseup', handleMouseUp);
		canvas.addEventListener('mouseleave', handleMouseUp);

		// Add touch support with the same smoothing logic
		canvas.addEventListener('touchstart', (e) => {
			e.preventDefault(); // Prevent scrolling on touch devices
			setIsDragging(true);
			setPreviousMousePosition({
				x: e.touches[0].clientX,
				y: e.touches[0].clientY
			});
			velocityRef.current = { x: 0, y: 0 };
		});

		canvas.addEventListener('touchmove', (e) => {
			e.preventDefault(); // Prevent scrolling on touch devices
			if (!isDragging || !ref.current) return;

			const deltaMove = {
				x: e.touches[0].clientX - previousMousePosition.x,
				y: e.touches[0].clientY - previousMousePosition.y
			};

			velocityRef.current = {
				x: deltaMove.x * rotationSpeed,
				y: deltaMove.y * rotationSpeed
			};

			ref.current.rotation.y += velocityRef.current.x;
			ref.current.rotation.x += velocityRef.current.y;

			setPreviousMousePosition({
				x: e.touches[0].clientX,
				y: e.touches[0].clientY
			});
		});

		canvas.addEventListener('touchend', handleMouseUp);

		// Cleanup
		return () => {
			canvas.removeEventListener('mousedown', handleMouseDown);
			canvas.removeEventListener('mousemove', handleMouseMove);
			canvas.removeEventListener('mouseup', handleMouseUp);
			canvas.removeEventListener('mouseleave', handleMouseUp);
			canvas.removeEventListener('touchstart', handleMouseDown);
			canvas.removeEventListener('touchmove', handleMouseMove);
			canvas.removeEventListener('touchend', handleMouseUp);
		};
	}, [gl, isDragging, ref, rotationSpeed]);
}

function Model({ position = [0, 0, 0], scale = 1 }) {
	const ref = useRef();
	const { nodes, materials } = useGLTF(MODEL_PATH);

	// Load custom texture
	const customTexture = useTexture(TEXTURE_PATH);

	// Load environment map for reflections
	const texture = useLoader(RGBELoader, ENVMAP_PATH);

	// Apply smooth drag rotation
	useDragRotation(ref);

	// Add a subtle auto-rotation when not interacting
	const autoRotateRef = useRef({ active: true });

	useFrame((state, delta) => {
		// Apply very subtle auto-rotation when not being dragged
		if (autoRotateRef.current.active && ref.current) {
			ref.current.rotation.y += delta * 0.2; // Slow continuous rotation
		}
	});

	// Disable auto-rotation during user interaction and re-enable after a delay
	useEffect(() => {
		const handleInteractionStart = () => {
			autoRotateRef.current.active = false;
		};

		const handleInteractionEnd = () => {
			// Re-enable auto-rotation after 4 seconds of no interaction
			setTimeout(() => {
				autoRotateRef.current.active = true;
			}, 4000);
		};

		window.addEventListener('mousedown', handleInteractionStart);
		window.addEventListener('mouseup', handleInteractionEnd);
		window.addEventListener('touchstart', handleInteractionStart);
		window.addEventListener('touchend', handleInteractionEnd);

		return () => {
			window.removeEventListener('mousedown', handleInteractionStart);
			window.removeEventListener('mouseup', handleInteractionEnd);
			window.removeEventListener('touchstart', handleInteractionStart);
			window.removeEventListener('touchend', handleInteractionEnd);
		};
	}, []);

	// Find the appropriate geometry from your model
	const firstKey = Object.keys(nodes).find(key => nodes[key].geometry);
	const modelGeometry = firstKey ? nodes[firstKey].geometry : null;

	if (!modelGeometry) {
		console.error("Could not find geometry in the model");
		return null;
	}

	return (
		<CubeCamera resolution={256} frames={1} envMap={texture}>
			{(texture) => (
				<group ref={ref} position={position}>
					<mesh
						castShadow
						geometry={modelGeometry}
						scale={scale}>
						<meshPhysicalMaterial
							map={customTexture}
							envMap={texture}
							roughness={0.2}
							metalness={0.8}
							clearcoat={1}
							reflectivity={1}
							ior={1.5}
							transmission={0.1}
							toneMapped={false}
						/>
					</mesh>
				</group>
			)}
		</CubeCamera>
	);
}

export default function ModelViewer() {
	return (
		<Canvas shadows camera={{ position: [-5, 1.5, 5], fov: 45 }}>
			<color attach="background" args={['#0a0a0a']} /> {/* Black background */}
			<ambientLight intensity={0.5 * Math.PI} />
			<spotLight
				decay={0.2}
				position={[5, 5, -10]}
				angle={0.15}
				penumbra={1}
				intensity={1.5}
				castShadow
			/>
			<pointLight decay={0.2} position={[-10, -10, -10]} intensity={0.5} />

			<Center>
				<Model position={[0, 0, 0]} scale={1.5} />
			</Center>

			<Environment files={ENVMAP_PATH} />

			<EffectComposer>
				<Bloom luminanceThreshold={1} intensity={2} levels={9} mipmapBlur />
			</EffectComposer>
		</Canvas>
	);
}

// Preload the model to avoid flickering
useGLTF.preload(MODEL_PATH);

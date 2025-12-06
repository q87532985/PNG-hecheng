import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';

// --- Icons ---
const IconUpload = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>;
const IconDownload = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>;
const IconLayers = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
const IconEye = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>;
const IconEyeOff = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>;
const IconTrash = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>;
const IconZoomIn = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/></svg>;
const IconZoomOut = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/><line x1="8" y1="11" x2="14" y2="11"/></svg>;
const IconUndo = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 7v6h6"/><path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/></svg>;
const IconRefresh = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>;
const IconLock = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;
const IconUnlock = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>;
const IconFlipH = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 9l-4-4-4 4M21 9H13.5M3 15l4 4 4-4M3 15h7.5M10.5 5v14M13.5 5v14"/></svg>;
const IconFlipV = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3l4 4-4 4M15 3V10.5M9 21l-4-4 4-4M9 21V13.5M5 10.5h14M5 13.5h14"/></svg>;
const IconCopy = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>;
const IconCenter = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><circle cx="12" cy="12" r="3"/></svg>;
const IconArrowUp = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>;
const IconArrowDown = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>;
const IconChevronsUp = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="17 11 12 6 7 11"></polyline><polyline points="17 18 12 13 7 18"></polyline></svg>;
const IconChevronsDown = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="7 13 12 18 17 13"></polyline><polyline points="7 6 12 11 17 6"></polyline></svg>;

// --- Types ---
interface Layer {
  id: string;
  name: string;
  src: string;
  img: HTMLImageElement;
  x: number;
  y: number;
  width: number;
  height: number;
  visible: boolean;
  locked: boolean;
  opacity: number;
  flipX: boolean;
  flipY: boolean;
}

interface ViewTransform {
  scale: number;
  x: number;
  y: number;
}

interface OutputConfig {
  width: number;
  height: number;
}

interface HistoryState {
  layers: Layer[];
  config: OutputConfig;
}

interface SnapLines {
  x: number[];
  y: number[];
}

// --- Styles ---
const styles = `
  body, html { margin: 0; padding: 0; height: 100%; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; background: #eef1f5; color: #333; overflow: hidden; }
  * { box-sizing: border-box; }
  
  .app-container { display: flex; height: 100vh; flex-direction: column; }
  
  /* Header */
  .header { height: 60px; background: white; border-bottom: 1px solid #ddd; display: flex; align-items: center; justify-content: space-between; padding: 0 20px; flex-shrink: 0; z-index: 20; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
  .logo { font-size: 18px; font-weight: 700; color: #1a1a1a; display: flex; align-items: center; gap: 8px; margin-right: 20px; white-space: nowrap; }
  .logo span { background: linear-gradient(135deg, #1890ff, #36cfc9); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  
  .header-center { flex: 1; display: flex; justify-content: center; overflow: hidden; }

  .actions { display: flex; gap: 12px; align-items: center; }
  .btn { height: 36px; padding: 0 16px; border-radius: 6px; border: none; cursor: pointer; font-size: 14px; transition: all 0.2s; font-weight: 500; display: inline-flex; align-items: center; justify-content: center; gap: 6px; user-select: none; }
  .btn:active { transform: translateY(1px); }
  .btn:disabled { opacity: 0.5; cursor: not-allowed; }
  .btn-primary { background: #1890ff; color: white; box-shadow: 0 2px 0 rgba(24, 144, 255, 0.1); }
  .btn-primary:hover:not(:disabled) { background: #40a9ff; box-shadow: 0 4px 8px rgba(24, 144, 255, 0.2); }
  .btn-secondary { background: #fff; border: 1px solid #d9d9d9; color: #333; }
  .btn-secondary:hover:not(:disabled) { border-color: #1890ff; color: #1890ff; background: #f0f7ff; }
  .btn.drag-active { background: #e6f7ff; border-color: #1890ff; border-style: dashed; color: #1890ff; }
  .btn-danger-text { color: #ff4d4f; background: transparent; border: 1px solid transparent; }
  .btn-danger-text:hover { background: #fff1f0; border-color: #ffa39e; }
  
  /* Edit Toolbar in Header */
  .edit-toolbar { display: flex; align-items: center; gap: 16px; padding: 0 10px; }
  .edit-section { display: flex; align-items: center; gap: 8px; border-right: 1px solid #eee; padding-right: 16px; }
  .edit-section:last-child { border-right: none; padding-right: 0; }
  .edit-label { font-size: 12px; color: #999; margin-right: 4px; display: none; }
  @media (min-width: 1200px) { .edit-label { display: inline-block; } }
  .slider-control { display: flex; align-items: center; gap: 8px; }
  .slider-control input[type=range] { width: 80px; }

  /* Main Layout */
  .workspace-wrapper { flex: 1; display: flex; overflow: hidden; position: relative; }
  
  /* Sidebar (Layers) */
  .sidebar { width: 260px; background: white; border-right: 1px solid #e8e8e8; display: flex; flex-direction: column; z-index: 10; flex-shrink: 0; }
  .sidebar-header { padding: 16px; border-bottom: 1px solid #f0f0f0; font-weight: 600; font-size: 14px; display: flex; justify-content: space-between; align-items: center; color: #595959; background: #fafafa; }
  
  .layer-list { flex: 1; overflow-y: auto; padding: 12px; display: flex; flex-direction: column; }
  .empty-layers { text-align: center; color: #999; margin-top: 40px; font-size: 13px; line-height: 1.5; padding: 0 20px; }
  
  .layer-item { 
    display: flex; align-items: center; padding: 8px; background: #fff; border: 1px solid #f0f0f0; 
    margin-bottom: 8px; border-radius: 6px; cursor: pointer; transition: all 0.2s; user-select: none;
    position: relative;
  }
  .layer-item:hover { border-color: #d9d9d9; transform: translateY(-1px); box-shadow: 0 2px 4px rgba(0,0,0,0.03); }
  .layer-item.dragging { opacity: 0.5; border: 2px dashed #1890ff; }
  .layer-item.active { background: #e6f7ff; border-color: #91d5ff; }
  .layer-item.active:after { content: ''; position: absolute; left: -1px; top: -1px; bottom: -1px; width: 3px; background: #1890ff; border-radius: 3px 0 0 3px; }
  
  .layer-thumb { width: 40px; height: 40px; object-fit: contain; background: #eee; border-radius: 4px; margin-right: 12px; border: 1px solid #f0f0f0; background-image: linear-gradient(45deg, #ddd 25%, transparent 25%), linear-gradient(-45deg, #ddd 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ddd 75%), linear-gradient(-45deg, transparent 75%, #ddd 75%); background-size: 8px 8px; }
  .layer-info { flex: 1; overflow: hidden; }
  .layer-name { font-size: 13px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: #333; margin-bottom: 4px; }
  .layer-meta { font-size: 11px; color: #999; display: flex; gap: 8px; }
  
  .layer-actions { display: flex; gap: 2px; opacity: 0.6; margin-left: 8px; }
  .layer-item:hover .layer-actions { opacity: 1; }
  .icon-btn { width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; border-radius: 4px; border: none; background: transparent; color: #666; cursor: pointer; transition: all 0.2s; }
  .icon-btn:hover { background: #f0f0f0; color: #1890ff; }
  .icon-btn.delete:hover { background: #fff1f0; color: #ff4d4f; }
  .layer-handle { cursor: grab; padding: 4px; color: #ccc; }
  .layer-handle:hover { color: #666; }
  
  /* Canvas Area */
  .canvas-container { flex: 1; position: relative; background: #f0f2f5; overflow: hidden; cursor: grab; }
  .canvas-container.panning { cursor: grabbing; }
  .canvas-container.dragging { cursor: default; }
  
  /* Controls overlay */
  .canvas-controls { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); background: white; padding: 6px 12px; border-radius: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); display: flex; align-items: center; gap: 12px; z-index: 50; }
  .zoom-val { font-size: 13px; font-variant-numeric: tabular-nums; width: 45px; text-align: center; color: #555; }
  
  /* Help Tooltip */
  .tooltip { position: absolute; top: 10px; right: 10px; background: rgba(255,255,255,0.9); padding: 8px 12px; border-radius: 6px; font-size: 12px; color: #666; pointer-events: none; border: 1px solid #ddd; z-index: 40; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }

  /* Hidden inputs */
  .hidden { display: none; }
`;

// --- Constants ---
const INITIAL_ZOOM = 1.0;
const INITIAL_CONFIG = { width: 800, height: 800 };

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // State
  const [layers, setLayers] = useState<Layer[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [view, setView] = useState<ViewTransform>({ scale: INITIAL_ZOOM, x: 50, y: 50 });
  const [isButtonDragOver, setIsButtonDragOver] = useState(false);
  const [canvasConfig, setCanvasConfig] = useState<OutputConfig>(INITIAL_CONFIG);
  const [containerSize, setContainerSize] = useState({ width: 800, height: 600 });
  const [snapLines, setSnapLines] = useState<SnapLines>({ x: [], y: [] });
  
  // Undo/Redo History
  const [history, setHistory] = useState<HistoryState[]>([{ layers: [], config: INITIAL_CONFIG }]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Refs for Async Access
  const layersRef = useRef(layers);
  const configRef = useRef(canvasConfig);

  useEffect(() => {
    layersRef.current = layers;
  }, [layers]);

  useEffect(() => {
    configRef.current = canvasConfig;
  }, [canvasConfig]);

  // Dragging state ref
  const dragRef = useRef({
    isDragging: false,
    mode: 'none' as 'none' | 'pan' | 'move' | 'resize',
    handle: null as string | null, // tl, tm, tr, rm, br, bm, bl, lm
    startX: 0,
    startY: 0,
    itemStart: { x: 0, y: 0, w: 0, h: 0 },
    viewStart: { x: 0, y: 0 },
    id: null as string | null, 
    hasMoved: false,
  });

  const [draggingLayerIndex, setDraggingLayerIndex] = useState<number | null>(null);
  const isSpacePressed = useRef(false);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        isSpacePressed.current = true;
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        handleUndo();
      }
      // Delete key
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) {
          // Check if active element is input
          if (document.activeElement?.tagName !== 'INPUT') {
               handleDelete(null, selectedId);
          }
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        isSpacePressed.current = false;
        if (!dragRef.current.isDragging && canvasRef.current) {
             canvasRef.current.style.cursor = 'default';
        }
      }
    };
    const handleResize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight
        });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('resize', handleResize);
    
    // Initial size
    handleResize();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleResize);
    };
  }, [historyIndex, history, selectedId]);

  // --- Helpers ---
  const generateId = () => Math.random().toString(36).substr(2, 9);
  
  const getCursorForHandle = (handle: string) => {
    switch (handle) {
      case 'tl': return 'nw-resize';
      case 'tm': return 'n-resize';
      case 'tr': return 'ne-resize';
      case 'lm': return 'w-resize';
      case 'rm': return 'e-resize';
      case 'bl': return 'sw-resize';
      case 'bm': return 's-resize';
      case 'br': return 'se-resize';
      default: return 'default';
    }
  };

  const saveHistory = useCallback((newLayers: Layer[], newConfig: OutputConfig) => {
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push({ layers: newLayers, config: newConfig });
      if (newHistory.length > 30) newHistory.shift(); 
      return newHistory;
    });
    setHistoryIndex(prev => {
      const newIdx = Math.min(prev + 1, 30);
      return (prev + 1 > 30) ? 30 : prev + 1;
    });
  }, [historyIndex]);

  const addToHistory = (newLayers: Layer[], newConfig: OutputConfig) => {
    setLayers(newLayers);
    setCanvasConfig(newConfig);
    saveHistory(newLayers, newConfig);
  };

  const handleUndo = () => {
    setHistoryIndex(prev => {
      if (prev > 0) {
        const newIndex = prev - 1;
        const state = history[newIndex];
        setLayers(state.layers);
        setCanvasConfig(state.config);
        return newIndex;
      }
      return prev;
    });
  };

  const handleReset = () => {
    if (confirm('确定要重置画布吗？所有图层将被清除。')) {
      const emptyLayers: Layer[] = [];
      const defaultConfig = INITIAL_CONFIG;
      addToHistory(emptyLayers, defaultConfig);
      setSelectedId(null);
      setView({ scale: INITIAL_ZOOM, x: 50, y: 50 });
    }
  };

  // --- Handlers: Layers & Files ---
  
  const addImages = useCallback(async (files: File[]) => {
    const readImage = (file: File): Promise<Layer> => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    resolve({
                        id: generateId(),
                        name: file.name.replace(/\.(png|jpg|jpeg)$/i, ''),
                        src: e.target?.result as string,
                        img,
                        x: 0,
                        y: 0,
                        width: img.naturalWidth,
                        height: img.naturalHeight,
                        visible: true,
                        locked: false,
                        opacity: 1,
                        flipX: false,
                        flipY: false,
                    });
                };
                img.src = e.target?.result as string;
            };
            reader.readAsDataURL(file);
        });
    };

    const newLayerPromises = files.map(readImage);
    const newLayersData = await Promise.all(newLayerPromises);
    if (newLayersData.length === 0) return;

    // Use Refs to get latest state for async update
    const currentLayers = layersRef.current;
    let currentConfig = configRef.current;
    
    // Auto-resize if it's the first set of layers
    if (currentLayers.length === 0) {
      currentConfig = { 
          width: newLayersData[0].width, 
          height: newLayersData[0].height 
      };
    }

    // Center images
    const processedNewLayers = newLayersData.map(l => ({
        ...l,
        x: (currentConfig.width - l.width) / 2,
        y: (currentConfig.height - l.height) / 2
    }));

    // Append to end
    const finalLayers = [...currentLayers, ...processedNewLayers];
    
    // Batch update
    setLayers(finalLayers);
    setCanvasConfig(currentConfig);
    saveHistory(finalLayers, currentConfig);
    setSelectedId(processedNewLayers[processedNewLayers.length - 1].id);

  }, [saveHistory]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files).filter(f => f.type.includes('image'));
      addImages(files);
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDelete = (e: React.MouseEvent | null, id: string) => {
    if(e) e.stopPropagation();
    const newLayers = layers.filter(l => l.id !== id);
    addToHistory(newLayers, canvasConfig);
    if (selectedId === id) setSelectedId(null);
  };

  const handleToggleVisible = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newLayers = layers.map(l => l.id === id ? { ...l, visible: !l.visible } : l);
    addToHistory(newLayers, canvasConfig);
  };

  const handleToggleLock = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newLayers = layers.map(l => l.id === id ? { ...l, locked: !l.locked } : l);
    addToHistory(newLayers, canvasConfig);
  };

  // --- Layer Edit Actions ---
  const handleUpdateLayer = (id: string, updates: Partial<Layer>) => {
    const newLayers = layers.map(l => l.id === id ? { ...l, ...updates } : l);
    addToHistory(newLayers, canvasConfig);
  };

  const handleDuplicate = (id: string) => {
      const layer = layers.find(l => l.id === id);
      if(!layer) return;
      const newLayer = {
          ...layer,
          id: generateId(),
          name: layer.name + ' (副本)',
          x: layer.x + 20,
          y: layer.y + 20
      };
      // Push to end
      const newLayers = [...layers, newLayer];
      addToHistory(newLayers, canvasConfig);
      setSelectedId(newLayer.id);
  };

  const handleCenter = (id: string) => {
      const layer = layers.find(l => l.id === id);
      if(!layer) return;
      const newX = (canvasConfig.width - layer.width) / 2;
      const newY = (canvasConfig.height - layer.height) / 2;
      handleUpdateLayer(id, { x: newX, y: newY });
  };

  const handleReorder = (id: string, action: 'up' | 'down' | 'top' | 'bottom') => {
      const idx = layers.findIndex(l => l.id === id);
      if(idx === -1) return;
      const newLayers = [...layers];
      const item = newLayers.splice(idx, 1)[0];

      // Array 0 = Back, Array Last = Front
      if (action === 'bottom') { // Send to Back (Index 0)
          newLayers.unshift(item);
      } else if (action === 'top') { // Bring to Front (Index End)
          newLayers.push(item);
      } else if (action === 'down') { // Send Backward (Index - 1)
          if (idx === 0) {
              newLayers.unshift(item); // already bottom
          } else {
              newLayers.splice(idx - 1, 0, item);
          }
      } else if (action === 'up') { // Bring Forward (Index + 1)
          if (idx >= layers.length) {
              newLayers.push(item); // already top
          } else {
              newLayers.splice(idx + 1, 0, item);
          }
      }
      addToHistory(newLayers, canvasConfig);
  };

  // --- Layer Drag & Drop Sorting ---
  const handleLayerDragStart = (e: React.DragEvent, index: number) => {
    setDraggingLayerIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("application/x-layer-sort", index.toString());
  };

  const handleLayerDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggingLayerIndex === null || draggingLayerIndex === index) return;
    e.dataTransfer.dropEffect = "move";
  };

  const handleLayerDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    e.stopPropagation(); 
    const sourceIndexStr = e.dataTransfer.getData("application/x-layer-sort");
    
    if (sourceIndexStr) {
      const sourceIndex = parseInt(sourceIndexStr, 10);
      if (sourceIndex !== targetIndex) {
        const newLayers = [...layers];
        const [movedLayer] = newLayers.splice(sourceIndex, 1);
        newLayers.splice(targetIndex, 0, movedLayer);
        addToHistory(newLayers, canvasConfig);
      }
    }
    setDraggingLayerIndex(null);
  };

  // --- Handlers: Canvas Interaction ---

  const getMousePos = (e: React.MouseEvent | MouseEvent) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const screenToWorld = (sx: number, sy: number) => {
    return {
      x: (sx - view.x) / view.scale,
      y: (sy - view.y) / view.scale
    };
  };

  // Hit Test
  const hitTest = (wx: number, wy: number): { type: 'bg' | 'image' | 'handle', id?: string, handle?: string } => {
    if (selectedId) {
      const l = layers.find(l => l.id === selectedId);
      if (l && l.visible && !l.locked) { 
        // 8 handles
        const hw = 10 / view.scale; 
        
        const handles = [
            { name: 'tl', x: l.x, y: l.y },
            { name: 'tm', x: l.x + l.width / 2, y: l.y },
            { name: 'tr', x: l.x + l.width, y: l.y },
            { name: 'lm', x: l.x, y: l.y + l.height / 2 },
            { name: 'rm', x: l.x + l.width, y: l.y + l.height / 2 },
            { name: 'bl', x: l.x, y: l.y + l.height },
            { name: 'bm', x: l.x + l.width / 2, y: l.y + l.height },
            { name: 'br', x: l.x + l.width, y: l.y + l.height },
        ];

        for (const h of handles) {
          if (wx >= h.x - hw && wx <= h.x + hw && wy >= h.y - hw && wy <= h.y + hw) {
            return { type: 'handle', id: l.id, handle: h.name };
          }
        }
      }
    }

    // Reverse loop: Check Top (Last) to Bottom (First)
    for (let i = layers.length - 1; i >= 0; i--) {
      const l = layers[i];
      if (!l.visible) continue;
      // Simple bounding box hit test. Flipping doesn't change BBox.
      if (wx >= l.x && wx <= l.x + l.width && wy >= l.y && wy <= l.y + l.height) {
        return { type: 'image', id: l.id };
      }
    }

    return { type: 'bg' };
  };

  const onMouseDown = (e: React.MouseEvent) => {
    const { x: mx, y: my } = getMousePos(e);
    const { x: wx, y: wy } = screenToWorld(mx, my);
    
    if (e.button === 1 || (e.button === 0 && isSpacePressed.current)) {
      dragRef.current = {
        isDragging: true,
        mode: 'pan',
        handle: null,
        startX: mx,
        startY: my,
        itemStart: { x: 0, y: 0, w: 0, h: 0 },
        viewStart: { ...view },
        id: null,
        hasMoved: false
      };
      if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
      return;
    }

    const hit = hitTest(wx, wy);

    if (hit.type === 'handle' && hit.id) {
      const l = layers.find(lay => lay.id === hit.id)!;
      dragRef.current = {
        isDragging: true,
        mode: 'resize',
        handle: hit.handle!,
        startX: mx, 
        startY: my,
        itemStart: { x: l.x, y: l.y, w: l.width, h: l.height },
        viewStart: { ...view },
        id: hit.id,
        hasMoved: false
      };
      if (canvasRef.current) canvasRef.current.style.cursor = getCursorForHandle(hit.handle!);
    } else if (hit.type === 'image' && hit.id) {
      setSelectedId(hit.id);
      const l = layers.find(lay => lay.id === hit.id)!;
      
      if (l.locked) {
        dragRef.current = {
            isDragging: false, 
            mode: 'none',
            handle: null,
            startX: 0,
            startY: 0,
            itemStart: { x: 0, y: 0, w: 0, h: 0 },
            viewStart: { ...view },
            id: null,
            hasMoved: false
        };
        return;
      }

      dragRef.current = {
        isDragging: true,
        mode: 'move',
        handle: null,
        startX: mx,
        startY: my,
        itemStart: { x: l.x, y: l.y, w: l.width, h: l.height },
        viewStart: { ...view },
        id: hit.id,
        hasMoved: false
      };
      if (canvasRef.current) canvasRef.current.style.cursor = 'move';
    } else {
      setSelectedId(null);
      dragRef.current = {
        isDragging: true,
        mode: 'pan', 
        handle: null,
        startX: mx,
        startY: my,
        itemStart: { x: 0, y: 0, w: 0, h: 0 },
        viewStart: { ...view },
        id: null,
        hasMoved: false
      };
      if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
    }
  };

  const onMouseMove = useCallback((e: MouseEvent) => {
    // Cursor updates when NOT dragging
    if (!dragRef.current.isDragging) {
       if (!canvasRef.current) return;
       const { x: mx, y: my } = getMousePos(e);
       const { x: wx, y: wy } = screenToWorld(mx, my);
       
       if (isSpacePressed.current) {
         canvasRef.current.style.cursor = 'grab';
         return;
       }

       const hit = hitTest(wx, wy);
       if (hit.type === 'handle' && hit.handle) {
         canvasRef.current.style.cursor = getCursorForHandle(hit.handle);
       } else if (hit.type === 'image') {
          const l = layers.find(layer => layer.id === hit.id);
          canvasRef.current.style.cursor = l?.locked ? 'default' : 'move';
       } else {
         canvasRef.current.style.cursor = 'default';
       }
       return;
    }

    // Dragging Logic
    dragRef.current.hasMoved = true;
    const { x: mx, y: my } = getMousePos(e);
    const dx = (mx - dragRef.current.startX);
    const dy = (my - dragRef.current.startY);
    const { mode, itemStart, viewStart, id, handle } = dragRef.current;

    if (mode === 'pan') {
      setView({
        ...view,
        x: viewStart.x + dx,
        y: viewStart.y + dy
      });
    } else if (mode === 'move' && id) {
      const wdx = dx / view.scale;
      const wdy = dy / view.scale;
      
      let newX = itemStart.x + wdx;
      let newY = itemStart.y + wdy;

      const layer = layers.find(l => l.id === id);
      if (layer) {
          const w = itemStart.w;
          const h = itemStart.h;
          const cw = canvasConfig.width;
          const ch = canvasConfig.height;
          const threshold = 10 / view.scale;

          const snapsX: number[] = [];
          const snapsY: number[] = [];

          if (Math.abs(newX) < threshold) { newX = 0; snapsX.push(0); }
          else if (Math.abs((newX + w) - cw) < threshold) { newX = cw - w; snapsX.push(cw); }
          else if (Math.abs((newX + w/2) - cw/2) < threshold) { newX = cw/2 - w/2; snapsX.push(cw/2); }
          
          if (Math.abs(newY) < threshold) { newY = 0; snapsY.push(0); }
          else if (Math.abs((newY + h) - ch) < threshold) { newY = ch - h; snapsY.push(ch); }
          else if (Math.abs((newY + h/2) - ch/2) < threshold) { newY = ch/2 - h/2; snapsY.push(ch/2); }

          setSnapLines({ x: snapsX, y: snapsY });
      }

      setLayers(prev => prev.map(l => {
        if (l.id === id) {
          return { ...l, x: newX, y: newY };
        }
        return l;
      }));
    } else if (mode === 'resize' && id && handle) {
      const wdx = dx / view.scale;
      const wdy = dy / view.scale;
      
      const layer = layers.find(l => l.id === id);
      
      if (layer) {
          let nx = itemStart.x;
          let ny = itemStart.y;
          let nw = itemStart.w;
          let nh = itemStart.h;

          const cw = canvasConfig.width;
          const ch = canvasConfig.height;
          const threshold = 10 / view.scale;
          const snapsX: number[] = [];
          const snapsY: number[] = [];

          // 1. Calculate target edges
          let targetLeft = nx + (handle.includes('l') ? wdx : 0);
          let targetRight = nx + nw + (handle.includes('r') ? wdx : 0);
          let targetTop = ny + (handle.includes('t') ? wdy : 0);
          let targetBottom = ny + nh + (handle.includes('b') ? wdy : 0);

          // 2. Snap Logic
          // Snap Left
          if (handle.includes('l')) {
              if (Math.abs(targetLeft) < threshold) { targetLeft = 0; snapsX.push(0); }
              else if (Math.abs(targetLeft - cw) < threshold) { targetLeft = cw; snapsX.push(cw); }
          }
          // Snap Right
          if (handle.includes('r')) {
              if (Math.abs(targetRight - cw) < threshold) { targetRight = cw; snapsX.push(cw); }
              else if (Math.abs(targetRight) < threshold) { targetRight = 0; snapsX.push(0); }
          }
          // Snap Top
          if (handle.includes('t')) {
              if (Math.abs(targetTop) < threshold) { targetTop = 0; snapsY.push(0); }
              else if (Math.abs(targetTop - ch) < threshold) { targetTop = ch; snapsY.push(ch); }
          }
          // Snap Bottom
          if (handle.includes('b')) {
              if (Math.abs(targetBottom - ch) < threshold) { targetBottom = ch; snapsY.push(ch); }
              else if (Math.abs(targetBottom) < threshold) { targetBottom = 0; snapsY.push(0); }
          }

          setSnapLines({ x: snapsX, y: snapsY });

          // 3. Apply changes back to rect
          if (handle.includes('l')) {
            nx = targetLeft;
            nw = (itemStart.x + itemStart.w) - targetLeft;
          }
          if (handle.includes('r')) {
            nw = targetRight - itemStart.x;
          }
          if (handle.includes('t')) {
            ny = targetTop;
            nh = (itemStart.y + itemStart.h) - targetTop;
          }
          if (handle.includes('b')) {
            nh = targetBottom - itemStart.y;
          }

          if (nw < 10) nw = 10;
          if (nh < 10) nh = 10;

          setLayers(prev => prev.map(l => {
            if (l.id === id) {
               return { ...l, x: nx, y: ny, width: nw, height: nh };
            }
            return l;
          }));
      }
    }
  }, [view, layers, canvasConfig]); 

  const onMouseUp = useCallback(() => {
    setSnapLines({ x: [], y: [] }); 
    if (dragRef.current.isDragging) {
      const { mode, hasMoved } = dragRef.current;
      dragRef.current.isDragging = false;
      
      if (hasMoved && (mode === 'move' || mode === 'resize')) {
        saveHistory(layers, canvasConfig);
      }
      // Reset cursor
      if (canvasRef.current) canvasRef.current.style.cursor = 'default';
    }
  }, [layers, canvasConfig, saveHistory]);

  const changeZoom = (delta: number) => {
    setView(v => {
      const raw = v.scale + delta;
      const rounded = Math.round(raw * 10) / 10;
      return {...v, scale: Math.max(0.1, Math.min(5, rounded))};
    });
  }

  const onWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const zoomSensitivity = 0.001; 
      const newScale = Math.max(0.1, Math.min(5, view.scale - e.deltaY * zoomSensitivity));
      setView(v => ({ ...v, scale: newScale }));
    } else {
      setView(v => ({ ...v, x: v.x - e.deltaX, y: v.y - e.deltaY }));
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  // --- Rendering ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.translate(view.x, view.y);
    ctx.scale(view.scale, view.scale);

    // Canvas Background
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 20;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 10;
    ctx.fillRect(0, 0, canvasConfig.width, canvasConfig.height);
    ctx.shadowColor = 'transparent'; 
    
    // Grid
    const gridSize = 20;
    ctx.fillStyle = '#f0f0f0';
    for(let y=0; y<canvasConfig.height; y+=gridSize) {
      for(let x=0; x<canvasConfig.width; x+=gridSize) {
        if ((x/gridSize + y/gridSize) % 2 === 0) {
          ctx.fillRect(x, Math.min(y, canvasConfig.height), Math.min(gridSize, canvasConfig.width-x), Math.min(gridSize, canvasConfig.height-y));
        }
      }
    }

    // Layers (Draw from bottom (0) to top (length-1))
    for (let i = 0; i < layers.length; i++) {
      const l = layers[i];
      if (!l.visible) continue;
      
      ctx.save();
      ctx.globalAlpha = l.opacity;
      
      // Handle Flip
      const centerX = l.x + l.width / 2;
      const centerY = l.y + l.height / 2;
      ctx.translate(centerX, centerY);
      ctx.scale(l.flipX ? -1 : 1, l.flipY ? -1 : 1);
      
      ctx.drawImage(l.img, -l.width / 2, -l.height / 2, l.width, l.height);
      ctx.restore();
    }

    // Snap Lines
    ctx.strokeStyle = '#ff00ff';
    ctx.lineWidth = 1 / view.scale;
    ctx.beginPath();
    snapLines.x.forEach(x => {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasConfig.height);
    });
    snapLines.y.forEach(y => {
        ctx.moveTo(0, y);
        ctx.lineTo(canvasConfig.width, y);
    });
    ctx.stroke();

    // Selection Overlay
    if (selectedId) {
      const l = layers.find(lay => lay.id === selectedId);
      if (l && l.visible) {
        ctx.strokeStyle = l.locked ? '#ff4d4f' : '#1890ff';
        ctx.lineWidth = 2 / view.scale;
        
        if (l.locked) ctx.setLineDash([5, 5]);
        ctx.strokeRect(l.x, l.y, l.width, l.height);
        ctx.setLineDash([]);
        
        // Center mark
        ctx.beginPath();
        ctx.moveTo(l.x + l.width/2 - 5/view.scale, l.y + l.height/2);
        ctx.lineTo(l.x + l.width/2 + 5/view.scale, l.y + l.height/2);
        ctx.moveTo(l.x + l.width/2, l.y + l.height/2 - 5/view.scale);
        ctx.lineTo(l.x + l.width/2, l.y + l.height/2 + 5/view.scale);
        ctx.stroke();

        if (!l.locked) {
            ctx.fillStyle = 'white';
            ctx.strokeStyle = '#1890ff'; 
            const handleSize = 8 / view.scale;
            
            // 8 handles
            const handles = [
                { x: l.x, y: l.y }, // tl
                { x: l.x + l.width/2, y: l.y }, // tm
                { x: l.x + l.width, y: l.y }, // tr
                { x: l.x + l.width, y: l.y + l.height/2 }, // rm
                { x: l.x + l.width, y: l.y + l.height }, // br
                { x: l.x + l.width/2, y: l.y + l.height }, // bm
                { x: l.x, y: l.y + l.height }, // bl
                { x: l.x, y: l.y + l.height/2 }, // lm
            ];

            handles.forEach(({x, y}) => {
              ctx.beginPath();
              ctx.rect(x - handleSize/2, y - handleSize/2, handleSize, handleSize);
              ctx.fill();
              ctx.stroke();
            });
        }
      }
    }

  }, [layers, view, selectedId, canvasConfig, containerSize, snapLines]);

  // --- Export ---
  const handleExport = () => {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvasConfig.width;
    tempCanvas.height = canvasConfig.height;
    const ctx = tempCanvas.getContext('2d');
    if (!ctx) return;

    for (let i = 0; i < layers.length; i++) {
      const l = layers[i];
      if (!l.visible) continue;
      ctx.save();
      ctx.globalAlpha = l.opacity;
      const centerX = l.x + l.width / 2;
      const centerY = l.y + l.height / 2;
      ctx.translate(centerX, centerY);
      ctx.scale(l.flipX ? -1 : 1, l.flipY ? -1 : 1);
      ctx.drawImage(l.img, -l.width / 2, -l.height / 2, l.width, l.height);
      ctx.restore();
    }

    const link = document.createElement('a');
    link.download = `composition-${Date.now()}.png`;
    link.href = tempCanvas.toDataURL('image/png');
    link.click();
  };

  const onGlobalDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const onGlobalDrop = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleButtonDragOver = (e: React.DragEvent) => {
    if (e.dataTransfer.types.includes('Files')) {
      e.preventDefault();
      e.stopPropagation();
      setIsButtonDragOver(true);
      e.dataTransfer.dropEffect = 'copy';
    }
  };

  const handleButtonDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsButtonDragOver(false);
  };

  const handleButtonDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsButtonDragOver(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const files = Array.from(e.dataTransfer.files).filter(f => f.type.includes('image'));
      if(files.length > 0) addImages(files);
    }
  };

  const selectedLayer = layers.find(l => l.id === selectedId);

  return (
    <>
      <style>{styles}</style>
      <div 
        className="app-container" 
        onDragOver={onGlobalDragOver} 
        onDrop={onGlobalDrop} 
      >
        
        {/* Header */}
        <header className="header">
          <div className="logo">
            <span>PNG 合成工具</span>
          </div>

          <div className="header-center">
             {selectedId && selectedLayer ? (
               <div className="edit-toolbar" onMouseDown={e => e.stopPropagation()}>
                <div className="edit-section">
                   <span className="edit-label">透明度</span>
                   <div className="slider-control">
                     <input 
                       type="range" 
                       min="0" 
                       max="1" 
                       step="0.01" 
                       value={selectedLayer.opacity} 
                       onChange={(e) => handleUpdateLayer(selectedId, { opacity: parseFloat(e.target.value) })}
                     />
                     <span style={{fontSize: 12, width: 24}}>{Math.round(selectedLayer.opacity * 100)}%</span>
                   </div>
                </div>
                <div className="edit-section">
                  <span className="edit-label">变换</span>
                  <button className="icon-btn" title="水平翻转" onClick={() => handleUpdateLayer(selectedId, { flipX: !selectedLayer.flipX })}><IconFlipH /></button>
                  <button className="icon-btn" title="垂直翻转" onClick={() => handleUpdateLayer(selectedId, { flipY: !selectedLayer.flipY })}><IconFlipV /></button>
                  <button className="icon-btn" title="居中" onClick={() => handleCenter(selectedId)}><IconCenter /></button>
                </div>
                <div className="edit-section">
                   <span className="edit-label">层级</span>
                   <button className="icon-btn" title="置顶" onClick={() => handleReorder(selectedId, 'top')}><IconChevronsUp /></button>
                   <button className="icon-btn" title="上移" onClick={() => handleReorder(selectedId, 'up')}><IconArrowUp /></button>
                   <button className="icon-btn" title="下移" onClick={() => handleReorder(selectedId, 'down')}><IconArrowDown /></button>
                   <button className="icon-btn" title="置底" onClick={() => handleReorder(selectedId, 'bottom')}><IconChevronsDown /></button>
                </div>
                <div className="edit-section">
                   <button className="icon-btn" title="复制" onClick={() => handleDuplicate(selectedId)}><IconCopy /></button>
                   <button className="icon-btn delete" title="删除 (Delete)" onClick={(e) => handleDelete(e, selectedId)}><IconTrash /></button>
                </div>
              </div>
             ) : (
                 <div style={{color: '#ccc', fontSize: '13px', display: 'flex', alignItems: 'center'}}>
                     选中图片以编辑
                 </div>
             )}
          </div>

          <div className="actions">
             <button className="btn btn-secondary btn-danger-text" onClick={handleReset} title="清空所有图层">
              <IconRefresh /> 重置
            </button>
            <button className="btn btn-secondary" onClick={handleUndo} disabled={historyIndex <= 0} title="Ctrl+Z">
              <IconUndo /> 撤销
            </button>
            <div style={{ width: 1, height: 24, background: '#eee', margin: '0 4px' }}></div>
            <button 
                className={`btn btn-secondary ${isButtonDragOver ? 'drag-active' : ''}`} 
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleButtonDragOver}
                onDragLeave={handleButtonDragLeave}
                onDrop={handleButtonDrop}
                title="点击选择或拖拽图片到此按钮"
            >
              <IconUpload /> 添加图片
            </button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              multiple 
              accept="image/png,image/jpeg" 
              onChange={handleFileChange} 
            />
            <button className="btn btn-primary" onClick={handleExport}>
              <IconDownload /> 导出 PNG
            </button>
          </div>
        </header>

        {/* Workspace */}
        <div className="workspace-wrapper">
          
          {/* Left Sidebar: Layers */}
          <div className="sidebar">
            <div className="sidebar-header">
              <span>图层 ({layers.length})</span>
            </div>
            <div className="layer-list">
              {layers.length === 0 && (
                <div className="empty-layers">
                  <p>暂无图层</p>
                  <p>请点击“添加图片”或直接拖拽图片到上方按钮</p>
                </div>
              )}
              {layers.map((layer, index) => (
                <div 
                  key={layer.id} 
                  className={`layer-item ${selectedId === layer.id ? 'active' : ''} ${draggingLayerIndex === index ? 'dragging' : ''}`}
                  onClick={() => setSelectedId(layer.id)}
                  draggable
                  onDragStart={(e) => handleLayerDragStart(e, index)}
                  onDragOver={(e) => handleLayerDragOver(e, index)}
                  onDrop={(e) => handleLayerDrop(e, index)}
                >
                  <div className="layer-handle" title="拖拽排序">
                     <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="5" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="9" cy="19" r="2"/><circle cx="15" cy="5" r="2"/><circle cx="15" cy="12" r="2"/><circle cx="15" cy="19" r="2"/></svg>
                  </div>
                  <img src={layer.src} className="layer-thumb" alt="" />
                  <div className="layer-info">
                    <div className="layer-name">{layer.name}</div>
                    <div className="layer-meta">
                      {Math.round(layer.width)} x {Math.round(layer.height)}
                      {layer.locked && <span style={{ marginLeft: 6, color: '#ff4d4f' }}>已锁定</span>}
                    </div>
                  </div>
                  <div className="layer-actions">
                    <button 
                      className="icon-btn" 
                      title={layer.locked ? "解锁" : "锁定"}
                      onClick={(e) => handleToggleLock(e, layer.id)}
                    >
                      {layer.locked ? <IconLock /> : <IconUnlock />}
                    </button>
                    <button 
                      className="icon-btn" 
                      title={layer.visible ? "隐藏" : "显示"}
                      onClick={(e) => handleToggleVisible(e, layer.id)}
                    >
                      {layer.visible ? <IconEye /> : <IconEyeOff />}
                    </button>
                    <button 
                      className="icon-btn delete" 
                      title="删除"
                      onClick={(e) => handleDelete(e, layer.id)}
                    >
                      <IconTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center Canvas */}
          <div 
            className="canvas-container" 
            ref={containerRef}
            onMouseDown={onMouseDown}
            onWheel={onWheel}
          >
            
            <canvas 
              ref={canvasRef}
              width={containerSize.width}
              height={containerSize.height}
              style={{ display: 'block' }}
            />
            
            {/* Controls */}
            <div className="canvas-controls">
              <button className="icon-btn" onClick={() => changeZoom(-0.1)}><IconZoomOut /></button>
              <span className="zoom-val">{Math.round(view.scale * 100)}%</span>
              <button className="icon-btn" onClick={() => changeZoom(0.1)}><IconZoomIn /></button>
            </div>

            <div className="tooltip">
              提示：空格 + 拖拽可平移画布
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
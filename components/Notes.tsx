
import { useState } from 'react'
import Image from 'next/image'
import picture from '../public/notes.png'

export default function Notes() {
    const [isNotesOpen, setIsNotesOpen] = useState(false);
    const [noteContent, setNoteContent] = useState('')

    if (isNotesOpen) {
        return (
            <div
                style={{
                    position: 'fixed',
                    width: '50%',
                    height: '100vh',
                    background: 'white',
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                    borderRadius: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    zIndex: 100,
                    right: "0",  
                    top: "65px"    
                }}
            >
                {/* handle */}
                <div 
                    className="handle"
                    style={{
                        padding: '10px',
                        background: '#f5f5f5',
                        borderBottom: '1px solid #ddd',
                        borderRadius: '8px 8px 0 0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}
                >

                    {/* "Notes" on header and x button on the header */}
                    <div className="handle">Notes</div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                        <button 
                            onClick={() => setIsNotesOpen(false)}
                            style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '16px'
                            }}
                        >
                            ×
                        </button>
                    </div>
                </div>

                {/* text area where users can write */}
                <textarea
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                    style={{
                        flex: 1,
                        width: '100%',
                        padding: '16px',
                        border: 'none',
                        resize: 'none',
                        outline: 'none',
                        boxSizing: 'border-box',
                        fontSize: '14px',
                        lineHeight: '1.5',
                        fontFamily: 'inherit'
                    }}
                    placeholder="Write your notes here..."
                />
            </div>
        )
    }
    else {
        return (
            <div 
                onClick={() => setIsNotesOpen(!isNotesOpen)}
                style={{
                    position: 'absolute',        
                    right: '100px',    
                    cursor: 'pointer',
                }}
            >
                <Image 
                    src={picture}
                    alt="Notes Icon"
                    width={50}
                    height={50}
                />
            </div>
        )
    }
}




// if its better then maybe implement a drag notes section and put in a resize feature
// import { useState, useRef } from 'react'
// import Image from 'next/image'
// import picture from '../public/notes.png'

// export default function Notes() {
//     const [isNotesOpen, setIsNotesOpen] = useState(false);
//     const [noteContent, setNoteContent] = useState('');
    
//     const [position, setPosition] = useState({ x: window.innerWidth/2, y: 0 });
//     const dragRef = useRef<HTMLDivElement>(null);
//     const isDragging = useRef(false);
//     const dragStart = useRef({ x: 0, y: 0 });

//     const handleMouseDown = (e: React.MouseEvent) => {
//         // Only start drag if clicking the header area, not the textarea
//         if ((e.target as HTMLElement).classList.contains('drag-handle')) {
//             isDragging.current = true;
//             dragStart.current = {
//                 x: e.clientX - position.x,
//                 y: e.clientY - position.y
//             };
//         }
//     };

//     const handleMouseMove = (e: MouseEvent) => {
//         if (!isDragging.current) return;
        
//         setPosition({
//             x: e.clientX - dragStart.current.x,
//             y: e.clientY - dragStart.current.y
//         });
//     };

//     const handleMouseUp = () => {
//         isDragging.current = false;
//     };

//     // Add and remove event listeners
//     const startDragging = () => {
//         document.addEventListener('mousemove', handleMouseMove);
//         document.addEventListener('mouseup', handleMouseUp);
//     };

//     const stopDragging = () => {
//         document.removeEventListener('mousemove', handleMouseMove);
//         document.removeEventListener('mouseup', handleMouseUp);
//     };

//     if (isNotesOpen) {
//         return (
//             <div
//                 ref={dragRef}
//                 style={{
//                     position: 'fixed',
//                     left: position.x,
//                     top: position.y,
//                     width: '50%',
//                     height: '100vh',
//                     background: 'white',
//                     boxShadow: '0 0 10px rgba(0,0,0,0.1)',
//                     borderRadius: '8px',
//                     display: 'flex',
//                     flexDirection: 'column',
//                     zIndex: 100
//                 }}
//                 onMouseDown={handleMouseDown}
//                 onMouseEnter={startDragging}
//                 onMouseLeave={stopDragging}
//             >
//                 {/* Draggable header */}
//                 <div 
//                     className="drag-handle"
//                     style={{
//                         padding: '10px',
//                         background: '#f5f5f5',
//                         borderBottom: '1px solid #ddd',
//                         cursor: 'move',
//                         borderRadius: '8px 8px 0 0',
//                         display: 'flex',
//                         justifyContent: 'space-between',
//                         alignItems: 'center'
//                     }}
//                 >
//                     <div className="drag-handle">Notes</div>
//                     <div style={{ display: 'flex', gap: '10px' }}>
//                         {/* <Image 
//                             src={picture}
//                             alt="Notes Icon"
//                             width={20}
//                             height={20}
//                         /> */}
//                         <button 
//                             onClick={() => setIsNotesOpen(false)}
//                             style={{
//                                 background: 'none',
//                                 border: 'none',
//                                 cursor: 'pointer',
//                                 fontSize: '16px'
//                             }}
//                         >
//                             ×
//                         </button>
//                     </div>
//                 </div>

//                 {/* Textarea content */}
//                 <textarea
//                     value={noteContent}
//                     onChange={(e) => setNoteContent(e.target.value)}
//                     style={{
//                         flex: 1,
//                         width: '100%',
//                         padding: '12px',
//                         border: 'none',
//                         resize: 'none',
//                         outline: 'none',
//                         borderRadius: '0 0 8px 8px'
//                     }}
//                     placeholder="Write your notes here..."
//                 />
//             </div>
//         )
//     } else {
//         return (
//             <div 
//                 onClick={() => setIsNotesOpen(!isNotesOpen)}
//                 style={{
//                     position: 'absolute',
//                     right: '100px',
//                     cursor: 'pointer',
//                 }}
//             >
//                 <Image 
//                     src={picture}
//                     alt="Notes Icon"
//                     width={50}
//                     height={50}
//                 />
//             </div>
//         )
//     }
// }
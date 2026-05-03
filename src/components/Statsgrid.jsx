import React from 'react'
import { Zap , CheckCircle} from 'lucide-react';
function Statsgrid() {

    let totalTodos = 4;
    let activeTodos = 2;
    let completedTodos = 2;
    return (
        <>
            <div className='flex max-w-2xl m-auto gap-7'>

                <div className='backdrop-blur-2xl w-50 bg-linear-to-br from-violet-500/20 to-purple-500/20 rounded-2xl
      border border-violet-400/30 p-4 hover:scale-105 transition-transform duration-300 cursor-pointer'>
                    <div className='flex items-center  gap-2 mb-1'>
                        <Zap size={16} className='text-violet-400' />
                        <span className='text-violet-300 text-xs font-semibold'>Total</span>
                    </div>
                    <div className='text-2xl font-black text-white'>{totalTodos}</div>
                </div>

                <div className='backdrop-blur-2xl w-50 bg-linear-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl
      border border-blue-400/30 p-4 hover:scale-105 transition-transform duration-300 cursor-pointer'>
                    <div className='flex items-center gap-2 mb-1'>
                        {/* <Zap size={16} className='text-violet-400' /> */}
                        <div className='w-4 h-4 rounded-full border-2 border-blue-400'></div>
                        <span className='text-violet-300 text-xs font-semibold'>Active</span>
                    </div>
                    <div className='text-2xl font-black text-white'>{activeTodos}</div>
                </div>

                <div className='backdrop-blur-2xl w-50 bg-linear-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl
      border border-emerald-400/30 p-4 hover:scale-105 transition-transform duration-300 cursor-pointer'>
                    <div className='flex items-center gap-2 mb-1'>
                        <CheckCircle size={16} className='text-emerald-400' />
                        <span className='text-emerald-300 text-xs font-semibold'>Done</span>
                    </div>
                    <div className='text-2xl font-black text-white'>{completedTodos}</div>
                </div>

            </div>
        </>
    )
}

export default Statsgrid

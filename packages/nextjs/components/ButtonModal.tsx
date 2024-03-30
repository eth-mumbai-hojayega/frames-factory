import React, { useState } from 'react';

interface ButtonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (button: Button) => void;
}

interface Button {
  action: string;
  label: string;
  target: string;
}

const ButtonModal: React.FC<ButtonModalProps> = ({ isOpen, onClose, onSave }) => {
  const [action, setAction] = useState('');
  const [label, setLabel] = useState('');
  const [target, setTarget] = useState('');

  const handleClose = () => {
    setAction('');
    setLabel('');
    setTarget('');
    onClose();
  };

  const handleSave = () => {
    onSave({ action, label, target });
    handleClose();
  };

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="fixed inset-0 flex items-center justify-center">
          <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 relative">
            <button onClick={handleClose} className="absolute top-3 right-3 text-gray-500 hover:text-gray-600 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
            <div>
              <div className="mt-2">
                <label htmlFor="action" className="block text-sm font-medium text-gray-700 mb-1">Action</label>
                <input id="action" type="text" value={action} onChange={(e) => setAction(e.target.value)} placeholder="Action" className="w-full p-2 mb-4 mt-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100 text-black" />
                <label htmlFor="label" className="block text-sm font-medium text-gray-700 mb-1">Label</label>
                <input id="label" type="text" value={label} onChange={(e) => setLabel(e.target.value)} placeholder="Label" className="w-full p-2 mb-4 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100 text-black" />
                <label htmlFor="target" className="block text-sm font-medium text-gray-700 mb-1">Target</label>
                <input id="target" type="text" value={target} onChange={(e) => setTarget(e.target.value)} placeholder="Target" className="w-full p-2 mb-4 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-100 text-black" />
              </div>
            </div>

            <div className="mt-5 sm:mt-6">
              <button onClick={handleSave} type="button" className="inline-flex justify-center w-full border border-transparent px-4 py-2 bg-blue-500 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:text-sm rounded-md">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonModal;

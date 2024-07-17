import React from 'react';


const ModalLogout = ({ isOpen, onCancel, onLogout }) => {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
                    <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                        <div className="modal-content py-4 text-left px-6">
                            <div className="flex justify-between items-center pb-3">
                                <p className="text-2xl font-bold">Deseja fazer logout?</p>
                                <button
                                    onClick={onCancel}
                                    className="modal-close-button cursor-pointer z-50"
                                >
                                    <svg
                                        className="fill-current text-black"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                    >
                                        <path
                                            className="heroicon-ui"
                                            d="M6.293 6.293a1 1 0 0 1 1.414 0L9 7.586l1.293-1.293a1 1 0 1 1 1.414 1.414L10.414 9l1.293 1.293a1 1 0 1 1-1.414 1.414L9 10.414l-1.293 1.293a1 1 0 0 1-1.414-1.414L7.586 9 6.293 7.707a1 1 0 0 1 0-1.414z"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div className="modal-buttons flex justify-end pt-2">
                                <button
                                    onClick={onLogout}
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
                                >
                                    Sim, Logout
                                </button>
                                <button
                                    onClick={onCancel}
                                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalLogout;

// src/contexts/modal-context.tsx
'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ModalContextType {
  openModal: (config: ModalConfig) => void;
  closeModal: () => void;
  isOpen: boolean;
}

interface ModalConfig {
  title?: string;
  description?: string;
  content: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);

  const openModal = useCallback((config: ModalConfig) => {
    setModalConfig(config);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Clear config after animation completes
    setTimeout(() => setModalConfig(null), 300);
  }, []);

  return (
    <ModalContext.Provider
      value={{
        openModal,
        closeModal,
        isOpen
      }}
    >
      {children}
      
      {modalConfig && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent 
            className={`${
              modalConfig.size === 'sm' ? 'max-w-sm' :
              modalConfig.size === 'lg' ? 'max-w-lg' :
              modalConfig.size === 'xl' ? 'max-w-xl' :
              'max-w-md'
            }`}
          >
            {(modalConfig.title || modalConfig.description) && (
              <DialogHeader>
                {modalConfig.title && (
                  <DialogTitle>{modalConfig.title}</DialogTitle>
                )}
                {modalConfig.description && (
                  <DialogDescription>{modalConfig.description}</DialogDescription>
                )}
              </DialogHeader>
            )}
            {modalConfig.content}
          </DialogContent>
        </Dialog>
      )}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}

// Example usages:
export function useExampleModals() {
  const { openModal, closeModal } = useModal();

  const showConfirmation = ({
    title,
    message,
    onConfirm,
    onCancel
  }: {
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel?: () => void;
  }) => {
    openModal({
      title,
      description: message,
      size: 'sm',
      content: (
        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={() => {
              onCancel?.();
              closeModal();
            }}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              closeModal();
            }}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            Confirm
          </button>
        </div>
      )
    });
  };

  const showForm = ({
    title,
    form,
  }: {
    title: string;
    form: React.ReactNode;
  }) => {
    openModal({
      title,
      size: 'md',
      content: form
    });
  };

  const showAlert = ({
    title,
    message,
  }: {
    title: string;
    message: string;
  }) => {
    openModal({
      title,
      description: message,
      size: 'sm',
      content: (
        <div className="mt-6 flex justify-end">
          <button
            onClick={closeModal}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
          >
            OK
          </button>
        </div>
      )
    });
  };

  return {
    showConfirmation,
    showForm,
    showAlert
  };
}
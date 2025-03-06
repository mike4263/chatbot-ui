import * as React from 'react';
import {Assistant} from "@sdk/model";
import { RetrieverConnection } from '@sdk/model';
import { LLMConnection } from '@sdk/model';

export interface WizardData {
  editingAssistant?: Assistant;
  editingRetriever?: RetrieverConnection;
  editingLlm?: LLMConnection;
}

interface FlyoutWizardContextType {
  currentStep: number;
  nextStep: (p?: { editingRetriever?: unknown, editingAssistant?: unknown, editingLlm?: unknown }) => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  reloadList: boolean;
  setReloadList: (bool: boolean) => void;
  wizardData : WizardData;
}

const FlyoutWizardContext = React.createContext<FlyoutWizardContextType | undefined>(undefined);

export const FlyoutWizardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [wizardData, setWizardData] = React.useState({});
  const [reloadList, setReloadList] = React.useState(false);
  const nextStep = (data = {}) => {
    setWizardData( (prev) => ({...prev, ...data}));
    setCurrentStep((prev) => prev + 1);
  }
  const prevStep = () => {
    setCurrentStep((prev) => prev - 1);
    setWizardData(()=> ({}));

  }
  const goToStep = (step: number) => setCurrentStep(step);

  return (
    <FlyoutWizardContext.Provider value={{ currentStep, nextStep, prevStep, goToStep, reloadList, setReloadList, wizardData }}>
      {children}
    </FlyoutWizardContext.Provider>
  );
};

export const useFlyoutWizard = () => {
  const context = React.useContext(FlyoutWizardContext);
  if (!context) {
    throw new Error('useFlyoutWizard must be used within a FlyoutWizardProvider');
  }
  return context;
};

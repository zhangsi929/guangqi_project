/*
 * @Author: Ethan Zhang
 * @Date: 2023-06-07 16:32:43
 * @LastEditTime: 2023-06-07 19:08:18
 * @FilePath: /guangqi/client/src/components/Nav/Pay/PayModel.jsx
 * @Description:
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */
import { Dialog, DialogTrigger, DialogButton } from 'src/components/ui/Dialog.tsx';
import DialogTemplate from 'src/components/ui/DialogTemplate.jsx';
import PlanCard from './PlanCard.jsx';

const PurchaseDialog = ({ open, onOpenChange }) => {
  const handlePurchase = (planId) => {
    // console.log(`Purchased: ${PLANS[planId].title}`);
    onOpenChange(false);
  };

  const mainContent = (
    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-5/6 mx-auto">
      <PlanCard planId="planA" onClick={() => handlePurchase('planA')} />
      <PlanCard planId="planB" onClick={() => handlePurchase('planB')} />
      <PlanCard planId="planC" onClick={() => handlePurchase('planC')} />
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTemplate title="选择您的计划" main={mainContent} selection={null} />
    </Dialog>
  );
};

export default PurchaseDialog;

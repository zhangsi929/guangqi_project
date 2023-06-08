/*
 * @Author: Ethan Zhang
 * @Date: 2023-06-04 12:33:41
 * @LastEditTime: 2023-06-07 18:42:14
 * @FilePath: /guangqi/client/src/components/ui/Dialog.tsx
 * @Description:
 *
 * DialogPrimitive.Portal
 * 用于将对话框（或其他浮动元素）渲染到页面的根元素之外，以避免对页面布局造成影响
 * 是一个使用 React Portal 机制创建的组件，它可以将子元素插入到 DOM 树的其他位置，这使得子元素能够从常规的 DOM 层级结构中"突破出来"。
 *
 * DialogPrimitive.Overlay
 * 主要用于控制对话框（或其他浮动元素）背后的遮罩层的样式，包括它的颜色、透明度、背景模糊等
 *
 *
 * “Portal”：这是一个 React 的概念，用于将子组件渲染到父组件 DOM 树之外的位置。
 * “Overlay”：这是一个常见的 UI 设计概念，通常用于创建一个遮罩层，用于模糊或阻挡背后的内容，以便用户可以专注于前景内容（如对话框、弹出窗口等）。
 * "Content"：在许多 UI 库和框架中，都有类似的概念，通常指代特定的内容区域，如对话框的主体内容。
 * "Trigger"：这是一个常见的 UI 设计概念，通常用于触发某些操作，如打开对话框、弹出菜单等。
 *
 * Copyright (c) 2023 Ethan Zhang, All Rights Reserved.
 */

import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Button } from '../ui/Button';
import { X } from 'lucide-react';

import { cn } from '../../utils';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = ({ className, children, ...props }: DialogPrimitive.DialogPortalProps) => (
  <DialogPrimitive.Portal className={cn(className)} {...props}>
    <div className="fixed inset-0 z-[999] flex items-start justify-center sm:items-center">
      {children}
    </div>
  </DialogPrimitive.Portal>
);
DialogPortal.displayName = DialogPrimitive.Portal.displayName;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, children, ...props }, ref) => (
  <DialogPrimitive.Overlay
    className={cn(
      'data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm transition-all duration-100',
      className
    )}
    {...props}
    ref={ref}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

interface DialogContentProps {
  className?: string;
  children: React.ReactNode;
  onClose?: () => void; // Add the onClose property here
}

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & DialogContentProps // Include DialogContentProps here
>(({ className, children, onClose, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'animate-in data-[state=open]:fade-in-90 data-[state=open]:slide-in-from-bottom-10 sm:zoom-in-90 data-[state=open]:sm:slide-in-from-bottom-0 fixed z-[999] grid w-full gap-4 rounded-b-lg bg-white p-6 sm:max-w-2/3 sm:rounded-lg',
        'dark:bg-slate-900',
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close
        onClick={onClose} // add onClose function here
        className="absolute right-4 top-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-slate-800"
      >
        <X className="h-4 w-4 text-black dark:text-white" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-2 text-center sm:text-left', className)} {...props} />
);
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2', className)}
    {...props}
  />
);
DialogFooter.displayName = 'DialogFooter';

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold text-slate-900', 'dark:text-slate-50', className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-slate-500', 'dark:text-slate-400', className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

const DialogClose = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Close>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Close>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Close
    ref={ref}
    className={cn(
      'mt-2 inline-flex h-10 items-center justify-center rounded-md border border-slate-200 bg-transparent px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-gray-900 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 sm:mt-0',
      className
    )}
    {...props}
  />
));
DialogClose.displayName = DialogPrimitive.Title.displayName;

const DialogButton = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, ...props }, ref) => (
  <Button
    ref={ref}
    variant="outline"
    className={cn(
      'mt-2 inline-flex h-10 items-center justify-center rounded-md border border-slate-200 bg-transparent px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-slate-100 dark:hover:bg-gray-900 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 sm:mt-0',
      className
    )}
    {...props}
  />
));
DialogButton.displayName = DialogPrimitive.Title.displayName;

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogButton
};

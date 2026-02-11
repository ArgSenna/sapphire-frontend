import Modal from './Modal'

interface ConfirmDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  confirmText?: string
  danger?: boolean
}

export default function ConfirmDialog({ open, onClose, onConfirm, title, message, confirmText = '确认', danger }: ConfirmDialogProps) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="mb-6 text-sm text-slate-400">{message}</p>
      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800"
        >
          取消
        </button>
        <button
          onClick={() => { onConfirm(); onClose() }}
          className={
            danger
              ? 'rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700'
              : 'rounded-lg bg-amber-600 px-4 py-2 text-sm text-white hover:bg-amber-700'
          }
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  )
}

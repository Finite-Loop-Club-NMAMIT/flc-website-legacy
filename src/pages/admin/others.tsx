import { type NextPage } from 'next'
import { Toaster, toast } from 'react-hot-toast'
import { BiExport } from 'react-icons/bi'

const Others: NextPage = () => {
  const fileName = `FLC ${
    new Date().getFullYear() - 1
  } - ${new Date().getFullYear()} Paid Members.csv`

  const handleDownload = async () => {
    const loadingToast = toast.loading('Exporting paid members...')
    await fetch('/api/export/paidMembers')
      .then(response => response.text())
      .then(csvString => {
        const blob = new Blob([csvString], { type: 'text/csv' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = fileName
        link.click()
      })
      .catch(err => {
        console.log(err)
        toast.error('Failed to export paid members!')
      })
    toast.dismiss(loadingToast)
    toast.success('Exported paid members successfully!')
  }

  return (
    <div className='mb-5'>
      <Toaster />
      <h4 className='heading mb-5 text-center text-2xl font-bold'>
        Other Functions
      </h4>
      <div className='flex justify-center'>
        <div
          className='flex cursor-pointer flex-col items-center justify-center gap-2 rounded-3xl border px-10 py-10 transition-all duration-300 hover:border-gray-300 hover:bg-gray-100 dark:border-gray-400 dark:hover:border-gray-500 dark:hover:bg-gray-800'
          onClick={handleDownload}
        >
          <BiExport size={50} />
          Export paid members
        </div>
      </div>
    </div>
  )
}

export default Others

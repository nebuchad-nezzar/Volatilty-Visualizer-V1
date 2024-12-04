import React from 'react';
import { FileText, AlertTriangle } from 'lucide-react';

interface CustomsFormProps {
  onSubmit: (data: any) => void;
  initialData?: any;
}

export default function CustomsForm({ onSubmit, initialData }: CustomsFormProps) {
  const [formData, setFormData] = React.useState({
    hsCode: initialData?.hsCode || '',
    category: initialData?.category || 'commercial',
    dutyPayer: initialData?.dutyPayer || 'sender',
    documents: [] as File[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, ...Array.from(e.target.files!)]
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          HS Code
        </label>
        <input
          type="text"
          value={formData.hsCode}
          onChange={(e) => setFormData({ ...formData, hsCode: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter HS Code"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="commercial">Commercial</option>
          <option value="personal">Personal</option>
          <option value="restricted">Restricted</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Duty Payer
        </label>
        <select
          value={formData.dutyPayer}
          onChange={(e) => setFormData({ ...formData, dutyPayer: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="sender">Sender</option>
          <option value="receiver">Receiver</option>
          <option value="third-party">Third Party</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Documents
        </label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
              >
                <span>Upload files</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  multiple
                  onChange={handleFileChange}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">
              PDF, PNG, JPG up to 10MB each
            </p>
          </div>
        </div>
      </div>

      {formData.category === 'restricted' && (
        <div className="rounded-md bg-yellow-50 p-4">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Restricted Items Notice
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  Additional documentation and approval may be required for restricted items.
                  Our team will contact you for further information.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Submit Customs Information
        </button>
      </div>
    </form>
  );
}
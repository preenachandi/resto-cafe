import React from 'react';

const AddonModal = ({
  selectedDish,
  selectedAddons,
  onAddonQuantityChange,
  onCancel,
  onConfirm,
}) => {
  if (!selectedDish) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Select Add-ons</h2>
        {selectedDish.addonCat.map((category) => (
          <div key={category.addon_category_id}>
            <h3 className="font-semibold">{category.addon_category}</h3>
            {category.addons.map((addon) => (
              <div key={addon.dish_id} className="flex items-center justify-between">
                <span>
                  {addon.dish_name} ({addon.dish_currency} {addon.dish_price})
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded-md"
                    onClick={() => onAddonQuantityChange(addon, 'remove')}
                  >
                    -
                  </button>
                  <span className="text-lg font-bold">
                    {selectedAddons.find((item) => item.dish_id === addon.dish_id)?.quantity || 0}
                  </span>
                  <button
                    className="bg-green-600 text-white px-2 py-1 rounded-md"
                    onClick={() => onAddonQuantityChange(addon, 'add')}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div className="flex justify-end mt-4">
          <button className="bg-red-500 text-white px-4 py-2 rounded-md mr-2" onClick={onCancel}>
            Cancel
          </button>
          <button className="bg-green-600 text-white px-4 py-2 rounded-md" onClick={onConfirm}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddonModal;

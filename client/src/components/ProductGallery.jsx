import { useState } from 'react';

const ProductGallery = ({ mainImage, thumbnails }) => {
    const [selectedImage, setSelectedImage] = useState(mainImage);

    return (
        <div className="flex flex-col space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg p-10 flex items-center justify-center aspect-square md:w-[400px] md:h-[400px]">
                <img
                    src={selectedImage}
                    alt="Main product"
                    className="max-h-full max-w-full object-contain"
                />
            </div>
            <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                {thumbnails.map((thumb, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedImage(thumb)}
                        className={`w-14 h-14 border-2 rounded-md flex-shrink-0 cursor-pointer p-1 transition-all ${selectedImage === thumb ? 'border-blue-600' : 'border-gray-200 hover:border-blue-300'}`}
                    >
                        <img src={thumb} className="w-full h-full object-contain" alt={`Thumbnail ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductGallery;

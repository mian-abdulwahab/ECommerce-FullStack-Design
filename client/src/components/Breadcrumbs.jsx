import { ChevronRight } from 'lucide-react';

const Breadcrumbs = ({ paths }) => {
    return (
        <nav className="flex items-center py-4 text-sm text-gray-500 overflow-x-auto whitespace-nowrap">
            {paths.map((path, index) => (
                <div key={index} className="flex items-center">
                    <span className={`hover:text-blue-600 cursor-pointer ${index === paths.length - 1 ? 'text-gray-900 font-medium' : ''}`}>
                        {path}
                    </span>
                    {index < paths.length - 1 && (
                        <ChevronRight className="w-4 h-4 mx-2" />
                    )}
                </div>
            ))}
        </nav>
    );
};

export default Breadcrumbs;

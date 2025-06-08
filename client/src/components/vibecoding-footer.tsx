export default function VibecodingFooter() {
  return (
    <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          vibecoded by{" "}
          <a 
            href="https://reverbwebdesign.ca" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium hover:bg-blue-700 transition-colors"
          >
            Reverb Web Design
          </a>
        </div>
        <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-500">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            Privacy Policy
          </button>
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
          >
            Service Terms
          </button>
        </div>
      </div>
    </div>
  );
}
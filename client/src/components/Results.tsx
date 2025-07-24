import { FileRecord } from '../types/FileRecord';

type Props = {
  results: FileRecord[];
};

const highlight = (text: string) => {
  return <span dangerouslySetInnerHTML={{ __html: text }} />;
};

const Results: React.FC<Props> = ({ results }) => {
  if (results.length === 0)
    return <p className="text-gray-500 italic">No results found.</p>;

  return (
    <div className="space-y-4 mt-4">
      {results.map(file => (
        <div
          key={file._id}
          className="border p-4 rounded shadow hover:bg-gray-50 transition"
        >
          <div className="flex justify-between items-center">
            <div>
              <strong>{file.filename}</strong>{' '}
              {file.size !== undefined && (
                <span className="text-sm text-gray-500">
                  ({Math.round(file.size / 1024)} KB)
                </span>
              )}
            </div>
          </div>

          <div className="text-sm mt-2 space-y-1">
            {file.highlights?.length > 0 ? (
              file.highlights.map((h, i) => (
                <div key={i}>{highlight(h)}</div>
              ))
            ) : (
              <p className="italic text-gray-400">No preview available</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Results;

// src/components/ConcernsList.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Concern {
  concernId: number;
  concern: string;
}

// interface ConcernsListProps {
//   role: string;
// }

const ConcernsList = () => {
  const [concerns, setConcerns] = useState<Concern[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/concerns")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch concerns");
        }
        return res.json();
      })
      .then((data) => {
        setConcerns(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading concerns...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

   const handleConcernClick = (concernId: number) => {
    navigate(`${concernId}`); // ✅ This will change URL & route
  };

  return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="flex flex-col gap-4 w-full max-w-xs">
        {concerns.map((item) => (
          <button
          style={{ backgroundColor: "#eeab42"}}
            key={item.concernId}
            onClick={() => handleConcernClick(item.concernId)}
            className="w-full px-6 py-3 text-white rounded-lg text-center text-lg font-medium hover:bg-green-700 transition"
          >
            {item.concern}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ConcernsList;

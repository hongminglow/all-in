import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";

export const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <ChevronLeft
      onClick={handleBack}
      className="mr-2 size-6 hover:cursor-pointer text-white hover:opacity-70"
    />
  );
};

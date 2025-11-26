const SubmitBtn = ({
  isSubmitting,
  title,
  className = "",
}: {
  isSubmitting: boolean;
  title: string;
  className?: string;
}) => {
  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={`
        flex items-center justify-center gap-2
        px-6 py-3 rounded-lg
         text-white font-medium
        
        disabled:opacity-50 disabled:cursor-not-allowed
        transition
        ${className}
      `}
    >
      {isSubmitting ? (
        <span className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
      ) : (
        title
      )}
    </button>
  );
};

export default SubmitBtn;


interface LocationCardProps {
  name: string;
  description: string;
  imageUrl: string;
}

export default function LocationCard({ name, description, imageUrl }: LocationCardProps) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-800 bg-slate-900/70 shadow-lg transition-shadow duration-300 hover:shadow-yellow-500/30">
      <img src={imageUrl} alt={`Image of ${name}`} className="h-48 w-full object-cover" />
      <div className="p-6">
        <h3 className="mb-2 text-2xl font-bold text-yellow-400">{name}</h3>
        <p className="text-slate-200">{description}</p>
      </div>
    </div>
  );
}

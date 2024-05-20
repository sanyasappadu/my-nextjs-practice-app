export default function UserProfilePage({params}){
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile</h1>
      <h2>user profile {params.id}</h2>
    </div>
  )
}
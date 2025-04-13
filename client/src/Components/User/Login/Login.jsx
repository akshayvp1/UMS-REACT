// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import { setAuthState, setUser } from "../../../redux/slice/authSlice";
// import axiosInstance from '../../../utils/axiosInstance'; 
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { validateEmail, validateName, validatePassword } from '../../../utils/inputvalidation';

// const Login = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     const [signState, setSignState] = useState("Sign In");
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: ''
//     });
//     const [errors, setErrors] = useState({
//         name: '',
//         email: '',
//         password: ''
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: value
//         }));
        
//         if (name === 'name') {
//             setErrors(prevErrors => ({
//                 ...prevErrors,
//                 name: validateName(value)
//             }));
//         }
//         if (name === 'email') {
//             setErrors(prevErrors => ({
//                 ...prevErrors,
//                 email: validateEmail(value)
//             }));
//         }
//         if (name === 'password') {
//             setErrors(prevErrors => ({
//                 ...prevErrors,
//                 password: validatePassword(value)
//             }));
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const url = signState === 'Sign In' ? '/auth/login' : '/auth/signup';
        
//         const nameError = validateName(formData.name);
//         const emailError = validateEmail(formData.email);
//         const passwordError = validatePassword(formData.password);

//         if (nameError || emailError || passwordError) {
//             setErrors({ name: nameError, email: emailError, password: passwordError });
//             return;
//         }

//         try {
//             const response = await axiosInstance.post(url, formData);

//             if (response.status === 200) {
//                 dispatch(setUser({ name: response.data.user.name, email: response.data.user.email }));
//                 dispatch(setAuthState())
//                 localStorage.setItem('token', response.data.accessToken);
//                 toast.success('Successfully logged in');
//                 navigate('/dashboard'); 
//             } else {
//                 toast.error(response.data.message || 'Something went wrong');
//             }
//         } catch (error) {
//             console.error('Error:', error);
//             toast.error(error.response?.data?.message || 'Something went wrong');
//         }
//     };

//     return (
//         <div className=""style={{marginTop:50}}>
           
            
//             <div className="">
//                 <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 mt-8">
//                     <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
//                         <ToastContainer position="top-right" autoClose={3000} />
                        
//                         <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
//                             {signState}
//                         </h2>
                        
//                         <form onSubmit={handleSubmit} className="space-y-6">
//                             {signState === "Sign Up" && (
//                                 <div>
//                                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                                         Name
//                                     </label>
//                                     <input
//                                         type="text"
//                                         id="name"
//                                         name="name"
//                                         value={formData.name}
//                                         onChange={handleChange}
//                                         placeholder="Enter your name"
//                                         className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//                                     />
//                                     {errors.name && (
//                                         <p className="mt-1 text-sm text-red-600">{errors.name}</p>
//                                     )}
//                                 </div>
//                             )}

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Email
//                                 </label>
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     name="email"
//                                     value={formData.email}
//                                     onChange={handleChange}
//                                     placeholder="Enter your email"
//                                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//                                 />
//                                 {errors.email && (
//                                     <p className="mt-1 text-sm text-red-600">{errors.email}</p>
//                                 )}
//                             </div>

//                             <div>
//                                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                                     Password
//                                 </label>
//                                 <input
//                                     type="password"
//                                     id="password"
//                                     name="password"
//                                     value={formData.password}
//                                     onChange={handleChange}
//                                     placeholder="Enter your password"
//                                     className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
//                                 />
//                                 {errors.password && (
//                                     <p className="mt-1 text-sm text-red-600">{errors.password}</p>
//                                 )}
//                             </div>

//                             <div className="text-center text-sm">
//                                 {signState === 'Sign In' ? (
//                                     <p className="text-gray-600">
//                                         New to this?{' '}
//                                         <span 
//                                             onClick={() => setSignState("Sign Up")}
//                                             className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium"
//                                         >
//                                             Sign Up Now
//                                         </span>
//                                     </p>
//                                 ) : (
//                                     <p className="text-gray-600">
//                                         Already have an account?{' '}
//                                         <span 
//                                             onClick={() => setSignState("Sign In")}
//                                             className="text-blue-600 hover:text-blue-700 cursor-pointer font-medium"
//                                         >
//                                             Sign In Now
//                                         </span>
//                                     </p>
//                                 )}
//                             </div>

//                             <button
//                                 type="submit"
//                                 disabled={Object.values(errors).some(error => error)}
//                                 className="w-full py-2 px-4 border border-transparent rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-medium transition-colors duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
//                             >
//                                 {signState === 'Sign In' ? 'Login' : 'Sign Up'}
//                             </button>
//                         </form>
//                     </div>
//                 </div>
               
//             </div>
//         </div>
//     );
// };

// export default Login;




// import React from 'react';
// import { User, Calendar, Phone, BookOpen, Monitor, Clock, Award, Users, MoveRight, Heart, Sun, Moon, Star } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import MeleteLogo from '../../../../src/assets/Melete-logo.svg'; // Ensure this path is correct
// import MeleteLogo1 from '../../../../src/assets/Melete-logo-2.svg'; 
// export default function MeleteHomepage() {
//   // Sample consultant data
//   const consultants = [
//     {
//       name: 'Jincy Mol G',
//       qualification: 'MSc Clinical Psychology & Diploma in Art Therapy',
//       expertise: ['Workplace Stress', 'Family Therapy', 'Relationships', 'Anxiety Management'],
//       languages: ['Malayalam', 'English', 'Hindi'],
//       counseling: ['Individual'],
//       image: 'https://via.placeholder.com/150',
//     },
//     {
//       name: 'Sapna Sharma',
//       qualification: 'MA in Psychology',
//       expertise: ['Emotional Regulation', 'Depression', 'Stress Management', 'Confidence Building'],
//       languages: ['English', 'Hindi'],
//       counseling: ['Individual'],
//       image: 'https://via.placeholder.com/150',
//     },
//     {
//       name: 'Varsha Patel',
//       qualification: 'MPhil Clinical Psychology & MDMP',
//       expertise: ['ADHD', 'Addiction Recovery', 'Depression', 'Grief Counseling'],
//       languages: ['English', 'Tamil', 'Hindi'],
//       counseling: ['Individual', 'Couple'],
//       image: 'https://via.placeholder.com/150',
//     },
//   ];

//   // What Improves With Therapy data
//   const therapyImprovements = [
//     { title: 'Self Confidence', desc: 'Believe in yourself and face challenges.', icon: <Star style={{ color: '#31A382' }} /> },
//     { title: 'Stress', desc: 'Restore balance with effective management.', icon: <Moon style={{ color: '#31A382' }} /> },
//     { title: 'Anxiety', desc: 'Find calm with professional guidance.', icon: <Heart style={{ color: '#31A382' }} /> },
//     { title: 'Depression', desc: 'Rediscover joy through therapy.', icon: <Sun style={{ color: '#31A382' }} /> },
//     { title: 'Sleep Hygiene', desc: 'Build restful sleep routines.', icon: <Moon style={{ color: '#31A382' }} /> },
//     { title: 'Unhealthy Diet', desc: 'Adopt balanced nutrition.', icon: <Heart style={{ color: '#31A382' }} /> },
//     { title: 'Physical Activity', desc: 'Boost mood with movement.', icon: <Users style={{ color: '#31A382' }} /> },
//     { title: 'Substance Abuse', desc: 'Overcome addiction with support.', icon: <Award style={{ color: '#31A382' }} /> },
//   ];

//   // Books data
//   const books = [
//     { title: 'Mindfulness Guide', desc: 'Live in the moment.', image: 'https://via.placeholder.com/100' },
//     { title: 'Yoga for Peace', desc: 'Find calm through movement.', image: 'https://via.placeholder.com/100' },
//     { title: 'Emotional Wellness', desc: 'Understand your emotions.', image: 'https://via.placeholder.com/100' },
//   ];

//   // Variants
//   const navVariants = {
//     hidden: { opacity: 0, y: -60 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
//   };
//   const sectionVariants = {
//     hidden: { opacity: 0, y: 60 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' } },
//   };
//   const cardVariants = {
//     hidden: { opacity: 0, y: 50, rotate: -5 },
//     visible: (i) => ({ opacity: 1, y: 0, rotate: 0, transition: { delay: i * 0.1, duration: 0.7 } }),
//     hover: { scale: 1.05, transition: { duration: 0.3 } },
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#F9F9F9] to-white font-sans overflow-x-hidden text-gray-900">
//       {/* Navigation */}
//       <motion.nav
//         className="p-6 sticky top-0 z-50 shadow-lg"
//         style={{ backgroundColor: '#015F4A', color: 'white' }}
//         variants={navVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <div className="container mx-auto flex justify-between items-center">
//           <motion.div className="flex items-center space-x-4" whileHover={{ scale: 1.1 }}>
//             <img src={MeleteLogo} alt="Melete Logo" className="h-14 w-auto" />
//             {MeleteLogo ? null : <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#31A382' }}>Melete</span>}
//           </motion.div>
//           <div className="hidden md:flex space-x-10 items-center">
//             {[
//               { name: 'How to Join', items: ['Child', 'Parent', 'Pregnant', 'Adult', 'Old Age'] },
//               { name: 'Relaxation For', items: ['Anger Issues', 'Depression', 'Mood Swings', 'Stress', 'Anxiety'] },
//               { name: 'My Diary', href: '#diary' },
//               { name: 'Blog', href: '#blog' },
//               { name: 'Login', href: '#login' },
//             ].map((menu, idx) => (
//               <div key={idx} className="group relative">
//                 {menu.items ? (
//                   <>
//                     <span
//                       className="cursor-pointer font-semibold hover:text-[#66BFA1] transition-colors duration-300"
//                       style={{ color: 'white' }}
//                     >
//                       {menu.name}
//                     </span>
//                     <motion.div
//                       className="absolute hidden group-hover:flex flex-col rounded-lg shadow-2xl p-5 mt-3 min-w-[180px]"
//                       style={{ backgroundColor: '#0A4F43', color: 'white' }}
//                       initial={{ opacity: 0, y: 15 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ duration: 0.4 }}
//                     >
//                       {menu.items.map((item) => (
//                         <a
//                           key={item}
//                           href={`#${item.toLowerCase().replace(' ', '-')}`}
//                           className="py-2 px-4 text-base hover:bg-[#1F6F5F] rounded-md transition-all duration-300"
//                           style={{ color: 'white' }}
//                         >
//                           {item}
//                         </a>
//                       ))}
//                     </motion.div>
//                   </>
//                 ) : (
//                   <a
//                     href={menu.href}
//                     className="font-semibold hover:text-[#66BFA1] transition-colors duration-300"
//                     style={{ color: 'white' }}
//                   >
//                     {menu.name}
//                   </a>
//                 )}
//               </div>
//             ))}
//           </div>
//           <motion.button
//             className="px-6 py-3 rounded-full font-semibold shadow-md"
//             style={{ backgroundColor: '#31A382', color: 'white', transition: 'all 0.3s' }}
//             whileHover={{ scale: 1.1, backgroundColor: '#2F9B7A' }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Get Started
//           </motion.button>
//         </div>
//       </motion.nav>

//       {/* Hero Section */}
//       <motion.section
//         className="py-28 text-center relative"
//         style={{ background: 'linear-gradient(to right, #F9F9F9, #F0F0F0)', backgroundImage: 'url(https://via.placeholder.com/1920x600)', backgroundSize: 'cover', backgroundPosition: 'center' }}
//         variants={sectionVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         <div className="container mx-auto px-4 relative z-10">
//           <motion.img
//             src={MeleteLogo1}
//             alt="Melete Logo"
//             className="mx-auto mb-6 h-20 w-auto"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.8 }}
//           />
//           <motion.blockquote
//             className="text-4xl md:text-6xl font-serif italic mb-8 max-w-4xl mx-auto"
//             style={{ color: '#015F4A' }}
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ delay: 0.4, duration: 0.9 }}
//           >
//             “Knowing yourself is the beginning of all wisdom.”
//           </motion.blockquote>
//           <motion.p
//             className="text-xl font-medium mb-10"
//             style={{ color: '#1F6F5F' }}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.6, duration: 0.8 }}
//           >
//             — Aristotle
//           </motion.p>
//           <motion.button
//             className="px-8 py-3 rounded-full font-semibold shadow-lg"
//             style={{ backgroundColor: '#31A382', color: 'white', transition: 'all 0.3s' }}
//             whileHover={{ scale: 1.1, backgroundColor: '#2F9B7A' }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Get Started
//           </motion.button>
//         </div>
//         <div className="absolute inset-0 bg-black opacity-30 z-0"></div> {/* Overlay for contrast */}
//       </motion.section>

//       {/* Mental Fitness Section with Background Image */}
//       <motion.section
//         className="py-24 text-center relative"
//         variants={sectionVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//       >
//         <div
//           className="absolute inset-0 bg-cover bg-center"
//           style={{
//             backgroundImage: 'url(src/assets/Melete-logo-3.png)', // Replace with your actual image
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//           }}
//         >
//           <div className="absolute inset-0 bg-[#015F4A] opacity-50"></div> {/* Dark overlay for contrast */}
//         </div>
//         <div className="container mx-auto px-4 relative z-10">
//           <h2 className="text-3xl md:text-4xl font-bold mb-10" style={{ color: '#666' }}>
//             How Can You Become Mentally Fit?
//           </h2>
//           <motion.div
//             className="relative w-full max-w-lg mx-auto h-72 mb-10"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1.2 }}
//           >
//             <svg className="w-full h-full" viewBox="0 0 200 200">
//               <motion.circle
//                 cx="100"
//                 cy="100"
//                 r="60"
//                 fill="none"
//                 stroke="#31A382"
//                 strokeWidth="6"
//                 initial={{ pathLength: 0 }}
//                 animate={{ pathLength: 1 }}
//                 transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
//               />
//               <motion.path
//                 d="M70 100 C70 120 130 120 130 100"
//                 fill="none"
//                 stroke="#31A382"
//                 strokeWidth="6"
//                 initial={{ pathLength: 0 }}
//                 animate={{ pathLength: 1 }}
//                 transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: 'easeInOut' }}
//               />
//               <motion.g initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse' }}>
//                 <Heart style={{ color: '#31A382' }} className="w-12 h-12" x="90" y="90" />
//               </motion.g>
//             </svg>
//           </motion.div>
//           <p className="text-lg max-w-3xl mx-auto mb-12 leading-relaxed" style={{ color: '#666' }}>
//             Mental fitness is about cultivating resilience, balance, and clarity through mindfulness, self-reflection, and healthy habits. Prioritize sleep, exercise, nutrition, and a supportive network to thrive.
//           </p>
//           <motion.button
//             className="px-10 py-4 rounded-full font-semibold shadow-xl"
//             style={{ backgroundColor: '#31A382', color: 'white', transition: 'all 0.3s' }}
//             whileHover={{ scale: 1.1, backgroundColor: '#2F9B7A' }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Get Started
//           </motion.button>
//         </div>
//       </motion.section>

//       {/* What Improves With Therapy */}
//       <motion.section
//         className="py-24 text-center"
//         style={{ backgroundColor: '#F9F9F9' }}
//         variants={sectionVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//       >
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ color: '#015F4A' }}>
//             What You Can Improve With Us
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
//             {therapyImprovements.map((item, index) => (
//               <motion.div
//                 key={item.title}
//                 className="p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
//                 style={{ backgroundColor: 'white', border: '1px solid #F0F0F0' }}
//                 variants={cardVariants}
//                 initial="hidden"
//                 animate="visible"
//                 custom={index}
//                 whileHover="hover"
//               >
//                 <div className="mb-5 flex justify-center">{item.icon}</div>
//                 <h3 className="text-lg font-semibold mb-3" style={{ color: '#015F4A' }}>
//                   {item.title}
//                 </h3>
//                 <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.section>

//       {/* Consultant Cards */}
//       <motion.section
//         className="py-24 text-center"
//         style={{ backgroundColor: 'white' }}
//         variants={sectionVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//       >
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ color: '#015F4A' }}>
//             Meet Our Certified Professionals
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
//             {consultants.map((consultant, index) => (
//               <motion.div
//                 key={consultant.name}
//                 className="p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
//                 style={{ backgroundColor: '#F9F9F9', border: '1px solid #F0F0F0' }}
//                 variants={cardVariants}
//                 initial="hidden"
//                 animate="visible"
//                 custom={index}
//                 whileHover="hover"
//               >
//                 <motion.img
//                   src={consultant.image}
//                   alt={consultant.name}
//                   className="w-36 h-36 rounded-full mx-auto mb-5 object-cover"
//                   style={{ border: '4px solid #66BFA1' }}
//                   initial={{ scale: 0.9, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   transition={{ duration: 0.6 }}
//                 />
//                 <h3 className="text-xl font-bold mb-3" style={{ color: '#015F4A' }}>
//                   {consultant.name}
//                 </h3>
//                 <p className="text-gray-600 mb-2 text-sm">{consultant.qualification}</p>
//                 <p className="text-gray-600 mb-2 text-sm">
//                   <strong>Expertise:</strong> {consultant.expertise.join(', ')}
//                 </p>
//                 <p className="text-gray-600 mb-2 text-sm">
//                   <strong>Languages:</strong> {consultant.languages.join(', ')}
//                 </p>
//                 <p className="text-gray-600 mb-5 text-sm">
//                   <strong>Counseling:</strong> {consultant.counseling.join(', ')}
//                 </p>
//                 <motion.button
//                   className="px-6 py-2 rounded-full font-semibold"
//                   style={{ backgroundColor: '#31A382', color: 'white', transition: 'all 0.3s' }}
//                   whileHover={{ scale: 1.1, backgroundColor: '#2F9B7A' }}
//                   whileTap={{ scale: 0.95 }}
//                   onClick={() => alert(`Booking session with ${consultant.name}`)}
//                 >
//                   Book Session
//                 </motion.button>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.section>

//       {/* Books Section */}
//       <motion.section
//         className="py-24 text-center"
//         style={{ backgroundColor: '#F0F0F0' }}
//         variants={sectionVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//       >
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ color: '#015F4A' }}>
//             Explore Our Resources
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
//             {books.map((book, index) => (
//               <motion.div
//                 key={book.title}
//                 className="p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
//                 style={{ backgroundColor: 'white', border: '1px solid #F0F0F0' }}
//                 variants={cardVariants}
//                 initial="hidden"
//                 animate="visible"
//                 custom={index}
//                 whileHover="hover"
//               >
//                 <motion.img
//                   src={book.image}
//                   alt={book.title}
//                   className="w-28 h-28 rounded-full mx-auto mb-5 object-cover"
//                   style={{ border: '2px solid #66BFA1' }}
//                   initial={{ rotate: -10 }}
//                   animate={{ rotate: 0 }}
//                   transition={{ duration: 0.6 }}
//                 />
//                 <h3 className="text-lg font-semibold mb-3" style={{ color: '#015F4A' }}>
//                   {book.title}
//                 </h3>
//                 <p className="text-gray-600 text-sm">{book.desc}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </motion.section>

//       {/* Footer */}
//       <motion.footer
//         className="py-12 text-center"
//         style={{ backgroundColor: '#015F4A', color: 'white' }}
//         variants={sectionVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//       >
//         <div className="container mx-auto px-4">
//           <motion.img
//             src={MeleteLogo}
//             alt="Melete Logo"
//             className="mx-auto mb-8 h-16 w-auto"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.8 }}
//           />
//           <motion.div
//             className="flex justify-center space-x-10 mb-8"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4, duration: 0.8 }}
//           >
//             {[
//               { href: '#facebook', icon: <Heart style={{ color: '#66BFA1' }} className="w-8 h-8" /> },
//               { href: '#twitter', icon: <Sun style={{ color: '#66BFA1' }} className="w-8 h-8" /> },
//               { href: '#instagram', icon: <Star style={{ color: '#66BFA1' }} className="w-8 h-8" /> },
//             ].map((social, idx) => (
//               <motion.a
//                 key={idx}
//                 href={social.href}
//                 whileHover={{ scale: 1.3, rotate: 15 }}
//                 transition={{ duration: 0.4 }}
//               >
//                 {social.icon}
//               </motion.a>
//             ))}
//           </motion.div>
//           <p className="text-gray-300 mb-6">© {new Date().getFullYear()} Melete Wellness Private Limited. All rights reserved.</p>
//           <div className="flex justify-center space-x-10 mb-6">
//             {[
//               { href: '#privacy', text: 'Privacy Policy' },
//               { href: '#terms', text: 'Terms' },
//               { href: '#refund', text: 'Refund Policy' },
//             ].map((link, idx) => (
//               <a
//                 key={idx}
//                 href={link.href}
//                 className="hover:text-[#66BFA1] transition-colors duration-300"
//                 style={{ color: 'gray' }}
//               >
//                 {link.text}
//               </a>
//             ))}
//           </div>
//           <p className="text-sm text-gray-400 max-w-2xl mx-auto">
//             Disclaimer: Melete is not a crisis helpline. For severe symptoms or self-harm thoughts, call Vandrevala Foundation: +91-9999666555.
//           </p>
//         </div>
//       </motion.footer>
//     </div>
//   );
// }



import React from 'react';
import { Star, Moon, Heart, Sun, Users, Award, Clock, Users as UsersIcon, Monitor, Target, HeartHandshake, Link2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MeleteLogo from '../../../../src/assets/Melete-logo.svg'; // Ensure this path is correct
import MeleteLogo1 from '../../../../src/assets/Melete-logo-2.svg';

export default function MeleteHomepage() {
  // Sample consultant data
  const consultants = [
    {
      name: 'Jincy Mol G',
      qualification: 'MSc Clinical Psychology & Diploma in Art Therapy',
      expertise: ['Workplace Stress', 'Family Therapy', 'Relationships', 'Anxiety Management'],
      languages: ['Malayalam', 'English', 'Hindi'],
      counseling: ['Individual'],
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Sapna Sharma',
      qualification: 'MA in Psychology',
      expertise: ['Emotional Regulation', 'Depression', 'Stress Management', 'Confidence Building'],
      languages: ['English', 'Hindi'],
      counseling: ['Individual'],
      image: 'https://via.placeholder.com/150',
    },
    {
      name: 'Varsha Patel',
      qualification: 'MPhil Clinical Psychology & MDMP',
      expertise: ['ADHD', 'Addiction Recovery', 'Depression', 'Grief Counseling'],
      languages: ['English', 'Tamil', 'Hindi'],
      counseling: ['Individual', 'Couple'],
      image: 'https://via.placeholder.com/150',
    },
  ];

  // What Improves With Therapy data with background images and icons
  const therapyImprovements = [
    { 
      title: 'Self Confidence', 
      desc: 'Self-confidence means believing in yourself and your abilities. It’s about trusting your own decisions, knowing your strengths and weaknesses, and feeling in control of your life. When you’re self-confident, you believe you can handle challenges and reach your goals, even when things get tough.', 
      icon: <Star style={{ color: '#31A382' }} />, 
      bgImage: 'src/assets/Self-Confidence.jpg' 
    },
    { 
      title: 'Stress', 
      desc: 'Psychological stress is the way our mind and body respond to pressure or challenges, whether they come from inside us or from the world around us. It happens when we feel off balance or overwhelmed. A little stress can be helpful and keep us motivated, but too much stress for a long time can harm our health and well-being.', 
      icon: <Moon style={{ color: '#31A382' }} />, 
      bgImage: 'src/assets/stress.jpg' 
    },
    { 
      title: 'Anxiety', 
      desc: 'Anxiety is a common emotion, and it can cause physical symptoms, such as shaking and sweating. When anxiety becomes persistent or excessive, a person may have an anxiety disorder.', 
      icon: <Heart style={{ color: '#31A382' }} />, 
      bgImage: 'src/assets/Anxiety.jpg' 
    },
    { 
      title: 'Depression', 
      desc: 'Depression is a common and serious mental disorder that negatively affects how you feel, think, act, and perceive the world.', 
      icon: <Sun style={{ color: '#31A382' }} />, 
      bgImage: 'src/assets/Depression.jpg' 
    },
    { 
      title: 'Sleep Hygiene', 
      desc: 'Sleep hygiene means having good habits and routines that help you sleep well. It includes things like going to bed at the same time each night, keeping your bedroom quiet and comfortable, and avoiding screens or caffeine before bed. These practices make it easier to fall asleep, stay asleep, and wake up feeling rested.', 
      icon: <Clock style={{ color: '#31A382' }} />, 
      bgImage: 'src/assets/Sleep-hygine.jpg' 
    },
    { 
      title: 'Unhealthy Diet', 
      desc: 'An unhealthy diet is when someone eats too many foods that are high in calories, sugar, unhealthy fats, and salt, but low in important nutrients like vitamins, minerals, and fiber. This often includes processed foods and sugary drinks, which can lead to health problems and increase the risk of diseases like diabetes and heart disease.', 
      icon: <Heart style={{ color: '#31A382' }} />, 
      bgImage: 'src/assets/Unhealthy-diet.jpg' 
    },
    { 
      title: 'Lack of Physical Activity', 
      desc: 'Lack of physical activity, or physical inactivity, refers to not engaging in enough moderate to vigorous exercise to support good health. This can include prolonged periods of sitting or a generally sedentary lifestyle, which over time may contribute to various health issues such as obesity, cardiovascular disease, and reduced mental well-being.', 
      icon: <UsersIcon style={{ color: '#31A382' }} />, 
      bgImage: 'src/assets/Lack-of-Physical-activity.jpg' 
    },
    { 
      title: 'Substance Abuse', 
      desc: 'The use of illegal drugs or the use of prescription or over-the-counter drugs or alcohol for purposes other than those for which they are meant to be used, or in excessive amounts. Substance abuse may lead to social, physical, emotional, and job-related problems.', 
      icon: <Award style={{ color: '#31A382' }} />, 
      bgImage: 'src/assets/Substance-abuse.jpg' 
    },
    { 
      title: 'Work Life Balance', 
      desc: 'Work-life balance means finding a healthy mix between your job and personal life. It’s about managing your time and energy so you can do your work, take care of your personal responsibilities, and still have time to rest and enjoy life. This balance helps you feel happier, less stressed, and more fulfilled.', 
      icon: <Clock style={{ color: '#31A382' }} />, 
      bgImage: 'src/assets/Worklife-balance.jpg' 
    },
    { 
      title: 'Social Connection', 
      desc: 'Social connection refers to the quality and quantity of relationships we have with others, encompassing a feeling of belonging and being cared for. It’s a fundamental human need, crucial for well-being and even physical health.', 
      icon: <UsersIcon style={{ color: '#31A382' }} />, 
      bgImage: 'src/assets/Social-connection.jpg' 
    },
    { 
      title: 'Digital Overload', 
      desc: 'Digital overload describes the feeling of being overwhelmed by the vast amount of digital information and interactions we encounter daily.', 
      icon: <Monitor style={{ color: '#31A382' }} />, 
      bgImage: 'src/assets/Digital-overloaded.jpg' 
    },
    { 
      title: 'Goal Direction', 
      desc: 'Goal direction means having a clear purpose and working toward it. It’s about planning your actions and making choices that help you reach a specific goal. Being goal-directed means you stay focused and take steps that move you closer to what you want to achieve.', 
      icon: <Target style={{ color: '#31A382' }} />, 
      bgImage: 'src/assets/Goal-direction.jpg' 
    },
    { 
      title: 'Emotional Need', 
      desc: 'Emotional needs are the feelings and support we need to feel happy and fulfilled. When these needs are met, we feel good about ourselves and our lives. If they’re not met, we might feel sad, frustrated, or lonely. Common emotional needs include feeling loved, accepted, appreciated, and having the freedom to make our own choices.', 
      icon: <Heart style={{ color: '#31A382' }} />, 
      bgImage: 'src/assets/Emotional-need.jpg' 
    },
    { 
      title: 'Relationship', 
      desc: 'Relationships play a crucial role in human well-being and personal growth, making them an essential part of our lives.', 
      icon: <HeartHandshake style={{ color: '#31A382' }} />, 
      bgImage: 'src/assets/Relationship.jpg' 
    },
  ];

  // Books data
  const books = [
    { title: 'Mindfulness Guide', desc: 'Live in the moment.', image: 'https://via.placeholder.com/100' },
    { title: 'Yoga for Peace', desc: 'Find calm through movement.', image: 'https://via.placeholder.com/100' },
    { title: 'Emotional Wellness', desc: 'Understand your emotions.', image: 'https://via.placeholder.com/100' },
  ];

  // Variants
  const navVariants = {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };
  const sectionVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut' } },
  };
  const cardVariants = {
    hidden: { opacity: 0, y: 50, rotate: -5 },
    visible: (i) => ({ opacity: 1, y: 0, rotate: 0, transition: { delay: i * 0.1, duration: 0.7 } }),
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9F9F9] to-white font-sans overflow-x-hidden text-gray-900">
      {/* Navigation */}
      <motion.nav
        className="p-6 sticky top-0 z-50 shadow-lg"
        style={{ backgroundColor: '#015F4A', color: 'white' }}
        variants={navVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto flex justify-between items-center">
          <motion.div className="flex items-center space-x-4" whileHover={{ scale: 1.1 }}>
            <img src={MeleteLogo} alt="Melete Logo" className="h-14 w-auto" />
            {MeleteLogo ? null : <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#31A382' }}>Melete</span>}
          </motion.div>
          <div className="hidden md:flex space-x-10 items-center">
            {[
              { name: 'How to Join', items: ['Child', 'Parent', 'Pregnant', 'Adult', 'Old Age'] },
              { name: 'Relaxation For', items: ['Anger Issues', 'Depression', 'Mood Swings', 'Stress', 'Anxiety'] },
              { name: 'My Diary', href: '#diary' },
              { name: 'Blog', href: '#blog' },
              { name: 'Login', href: '#login' },
            ].map((menu, idx) => (
              <div key={idx} className="group relative">
                {menu.items ? (
                  <>
                    <span
                      className="cursor-pointer font-semibold hover:text-[#66BFA1] transition-colors duration-300"
                      style={{ color: 'white' }}
                    >
                      {menu.name}
                    </span>
                    <motion.div
                      className="absolute hidden group-hover:flex flex-col rounded-lg shadow-2xl p-5 mt-3 min-w-[180px]"
                      style={{ backgroundColor: '#0A4F43', color: 'white' }}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      {menu.items.map((item) => (
                        <a
                          key={item}
                          href={`#${item.toLowerCase().replace(' ', '-')}`}
                          className="py-2 px-4 text-base hover:bg-[#1F6F5F] rounded-md transition-all duration-300"
                          style={{ color: 'white' }}
                        >
                          {item}
                        </a>
                      ))}
                    </motion.div>
                  </>
                ) : (
                  <a
                    href={menu.href}
                    className="font-semibold hover:text-[#66BFA1] transition-colors duration-300"
                    style={{ color: 'white' }}
                  >
                    {menu.name}
                  </a>
                )}
              </div>
            ))}
          </div>
          <motion.button
            className="px-6 py-3 rounded-full font-semibold shadow-md"
            style={{ backgroundColor: '#31A382', color: 'white', transition: 'all 0.3s' }}
            whileHover={{ scale: 1.1, backgroundColor: '#2F9B7A' }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.section
        className="py-28 text-center relative"
        style={{ background: 'linear-gradient(to right, #F9F9F9, #F0F0F0)', backgroundImage: 'url(https://via.placeholder.com/1920x600)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.img
            src={MeleteLogo1}
            alt="Melete Logo"
            className="mx-auto mb-6 h-20 w-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          />
          <motion.blockquote
            className="text-4xl md:text-6xl font-serif italic mb-8 max-w-4xl mx-auto"
            style={{ color: '#015F4A' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.9 }}
          >
            “Knowing yourself is the beginning of all wisdom.”
          </motion.blockquote>
          <motion.p
            className="text-xl font-medium mb-10"
            style={{ color: '#1F6F5F' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            — Aristotle
          </motion.p>
          <motion.button
            className="px-8 py-3 rounded-full font-semibold shadow-lg"
            style={{ backgroundColor: '#31A382', color: 'white', transition: 'all 0.3s' }}
            whileHover={{ scale: 1.1, backgroundColor: '#2F9B7A' }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </div>
        <div className="absolute inset-0 bg-black opacity-30 z-0"></div> {/* Overlay for contrast */}
      </motion.section>

      {/* Mental Fitness Section with Background Image */}
      <motion.section
        className="py-24 text-center relative"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(src/assets/Melete-logo-3.png)', // Replace with your actual image
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-[#015F4A] opacity-50"></div> {/* Dark overlay for contrast */}
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-10" style={{ color: '#666' }}>
            How Can You Become Mentally Fit?
          </h2>
          <motion.div
            className="relative w-full max-w-lg mx-auto h-72 mb-10"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
          >
            <svg className="w-full h-full" viewBox="0 0 200 200">
              <motion.circle
                cx="100"
                cy="100"
                r="60"
                fill="none"
                stroke="#31A382"
                strokeWidth="6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2.5, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }}
              />
              <motion.path
                d="M70 100 C70 120 130 120 130 100"
                fill="none"
                stroke="#31A382"
                strokeWidth="6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 0.5, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.g initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 1.2, repeat: Infinity, repeatType: 'reverse' }}>
                <Heart style={{ color: '#31A382' }} className="w-12 h-12" x="90" y="90" />
              </motion.g>
            </svg>
          </motion.div>
          <p className="text-lg max-w-3xl mx-auto mb-12 leading-relaxed" style={{ color: '#666' }}>
            Mental fitness is about cultivating resilience, balance, and clarity through mindfulness, self-reflection, and healthy habits. Prioritize sleep, exercise, nutrition, and a supportive network to thrive.
          </p>
          <motion.button
            className="px-10 py-4 rounded-full font-semibold shadow-xl"
            style={{ backgroundColor: '#31A382', color: 'white', transition: 'all 0.3s' }}
            whileHover={{ scale: 1.1, backgroundColor: '#2F9B7A' }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </div>
      </motion.section>

      {/* What Improves With Therapy */}
      <motion.section
        className="py-24 text-center"
        style={{ backgroundColor: '#F9F9F9' }}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ color: '#015F4A' }}>
            What You Can Improve With Us
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {therapyImprovements.map((item, index) => (
              <motion.div
                key={item.title}
                className="p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                style={{ minHeight: '300px', backgroundImage: `url(${item.bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                whileHover="hover"
              >
                {/* Overlay for text readability */}
                <div className="absolute inset-0 bg-black opacity-40"></div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
                  <div className="mb-5">{item.icon}</div>
                  <h3 className="text-lg font-semibold mb-3 text-center">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-center max-w-xs">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Consultant Cards */}
      <motion.section
        className="py-24 text-center"
        style={{ backgroundColor: 'white' }}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ color: '#015F4A' }}>
            Meet Our Certified Professionals
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {consultants.map((consultant, index) => (
              <motion.div
                key={consultant.name}
                className="p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                style={{ backgroundColor: '#F9F9F9', border: '1px solid #F0F0F0' }}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                whileHover="hover"
              >
                <motion.img
                  src={consultant.image}
                  alt={consultant.name}
                  className="w-36 h-36 rounded-full mx-auto mb-5 object-cover"
                  style={{ border: '4px solid #66BFA1' }}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6 }}
                />
                <h3 className="text-xl font-bold mb-3" style={{ color: '#015F4A' }}>
                  {consultant.name}
                </h3>
                <p className="text-gray-600 mb-2 text-sm">{consultant.qualification}</p>
                <p className="text-gray-600 mb-2 text-sm">
                  <strong>Expertise:</strong> {consultant.expertise.join(', ')}
                </p>
                <p className="text-gray-600 mb-2 text-sm">
                  <strong>Languages:</strong> {consultant.languages.join(', ')}
                </p>
                <p className="text-gray-600 mb-5 text-sm">
                  <strong>Counseling:</strong> {consultant.counseling.join(', ')}
                </p>
                <motion.button
                  className="px-6 py-2 rounded-full font-semibold"
                  style={{ backgroundColor: '#31A382', color: 'white', transition: 'all 0.3s' }}
                  whileHover={{ scale: 1.1, backgroundColor: '#2F9B7A' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => alert(`Booking session with ${consultant.name}`)}
                >
                  Book Session
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Books Section */}
      <motion.section
        className="py-24 text-center"
        style={{ backgroundColor: '#F0F0F0' }}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12" style={{ color: '#015F4A' }}>
            Explore Our Resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {books.map((book, index) => (
              <motion.div
                key={book.title}
                className="p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                style={{ backgroundColor: 'white', border: '1px solid #F0F0F0' }}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                custom={index}
                whileHover="hover"
              >
                <motion.img
                  src={book.image}
                  alt={book.title}
                  className="w-28 h-28 rounded-full mx-auto mb-5 object-cover"
                  style={{ border: '2px solid #66BFA1' }}
                  initial={{ rotate: -10 }}
                  animate={{ rotate: 0 }}
                  transition={{ duration: 0.6 }}
                />
                <h3 className="text-lg font-semibold mb-3" style={{ color: '#015F4A' }}>
                  {book.title}
                </h3>
                <p className="text-gray-600 text-sm">{book.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="py-12 text-center"
        style={{ backgroundColor: '#015F4A', color: 'white' }}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.img
            src={MeleteLogo}
            alt="Melete Logo"
            className="mx-auto mb-8 h-16 w-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          />
          <motion.div
            className="flex justify-center space-x-10 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {[
              { href: '#facebook', icon: <Heart style={{ color: '#66BFA1' }} className="w-8 h-8" /> },
              { href: '#twitter', icon: <Sun style={{ color: '#66BFA1' }} className="w-8 h-8" /> },
              { href: '#instagram', icon: <Star style={{ color: '#66BFA1' }} className="w-8 h-8" /> },
            ].map((social, idx) => (
              <motion.a
                key={idx}
                href={social.href}
                whileHover={{ scale: 1.3, rotate: 15 }}
                transition={{ duration: 0.4 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
          <p className="text-gray-300 mb-6">© {new Date().getFullYear()} Melete Wellness Private Limited. All rights reserved.</p>
          <div className="flex justify-center space-x-10 mb-6">
            {[
              { href: '#privacy', text: 'Privacy Policy' },
              { href: '#terms', text: 'Terms' },
              { href: '#refund', text: 'Refund Policy' },
            ].map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="hover:text-[#66BFA1] transition-colors duration-300"
                style={{ color: 'gray' }}
              >
                {link.text}
              </a>
            ))}
          </div>
          <p className="text-sm text-gray-400 max-w-2xl mx-auto">
            Disclaimer: Melete is not a crisis helpline. For severe symptoms or self-harm thoughts, call Vandrevala Foundation: +91-9999666555.
          </p>
        </div>
      </motion.footer>
    </div>
  );
}
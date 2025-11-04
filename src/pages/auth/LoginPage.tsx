import { Button } from "~/components/ui/button";
import { Dices } from "lucide-react";
import { useForm } from "react-hook-form";
import { createLoginSchema, type TLoginSchema } from "~/features/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "~/features/hooks/useAuth";
import { TextInput } from "~/components/base/TextInput";
import { PasswordInput } from "~/components/base/PasswordInput";

export const LoginPage = () => {
  const { authenticateUser } = useAuth();
  const form = useForm<TLoginSchema>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(createLoginSchema),
  });

  const onFormSubmit = (data: TLoginSchema) => {
    authenticateUser(data);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-4">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl mb-4 shadow-2xl">
            <Dices className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-white mb-2">DiceRoll Casino</h1>
          <p className="text-purple-200">Place Your Bets, Win Big!</p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20">
          <form
            onSubmit={form.handleSubmit(onFormSubmit)}
            className="space-y-6"
          >
            <div>
              <label htmlFor="username" className="block text-purple-100 mb-2">
                Username
              </label>
              <TextInput
                name="username"
                control={form.control}
                type="text"
                placeholder="Enter your username"
                className="bg-white/10 border-white/20 text-white placeholder:text-purple-300"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-purple-100 mb-2">
                Password
              </label>
              <PasswordInput
                name="password"
                control={form.control}
                placeholder="Enter your password"
                className="bg-white/10 border-white/20 text-white placeholder:text-purple-300"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-lg"
            >
              Login to Play
            </Button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="#"
              className="text-purple-200 hover:text-white transition-colors"
            >
              Forgot password?
            </a>
          </div>

          <div className="mt-4 text-center">
            <p className="text-purple-200">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                Sign up now
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-purple-300">
          <p>🎲 Roll the dice and change your fortune 🎲</p>
        </div>
      </div>
    </div>
  );
};

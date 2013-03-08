Personalpage::Application.routes.draw do
  root to: "main#index"
  match "asteroids" => "static#asteroids"
  match "snake" => "static#snake"
end

Rails.application.routes.draw do
  get '/test', to: 'application#test'
  resources :users, only: [:index, :show, :create, :update]
  resources :scores, only: [:index, :show, :create, :update]
  resources :leaderboards, only: [:index, :create]
end

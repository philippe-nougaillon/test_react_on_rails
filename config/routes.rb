Rails.application.routes.draw do
  resources :events
  
  get 'planning', to: 'planning#index'
  get 'hello_world', to: 'hello_world#index'
end

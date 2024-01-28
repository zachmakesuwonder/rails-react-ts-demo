#
#---------------------------------------------
#Author: Isaac Mirabueno
#Date: Sunday January 28th 2024
#Last Modified by: Isaac Mirabueno - <imirabueno@yondu.com>
#Last Modified time: January 28th 2024, 11:12:24 pm
#---------------------------------------------
#


Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'
    resource '*', :headers => :any, :methods => [:get, :post, :patch, :put, :delete]
  end
end
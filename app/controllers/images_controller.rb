class ImagesController < ApplicationController

  def index
  end


  def show
    @player = Player.new
  end

end

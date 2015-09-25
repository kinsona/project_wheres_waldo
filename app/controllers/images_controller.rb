class ImagesController < ApplicationController

  def index
  end


  def show
    @game = Game.new
    @game.create_player
    @game.start_time = @game.created_at

    @image = Image.find(params[:id])
    @game.image = @image

    @game.save!


    game_data = @game.to_json(:include => [:characters, :tags])

    respond_to do |format|
      format.html { render :show }
      format.json { render :json => game_data, :status => 200 }
    end
  end

end
